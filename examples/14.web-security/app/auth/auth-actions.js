'use server';

import { LoginFormSchema } from '@/app/auth/validation-rules';
import { getUserByEmail, verifyLogin, insertUser } from '../repo/userRepo';
import { createSession, deleteSession, verifySession } from '@/app/auth/session-helper';
import bcrypt from 'bcrypt';

export async function signup(state, formData) {
  // 1. Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 2. Prepare data for insertion into database
  const { name, email, password } = validatedFields.data;

  // 3. Check if the user's email already exists
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return {
      message: 'Email already exists, please use a different email or login.',
    };
  }

  // Hash the user's password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Insert the user into the database or call an Auth Provider's API
  const user = insertUser({
    name,
    email,
    password: hashedPassword,
  });

  if (!user) {
    return {
      message: 'An error occurred while creating your account.',
    };
  }

  // 4. Create a session for the user
    await createSession(user);
}

export async function login(state, formData) {
  // 1. Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });
  const errorMessage = { message: 'Invalid login credentials.' };

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 2. Query the database for the user with the given email
  const user = await  getUserByEmail(validatedFields.data.email);
 
  // If user is not found, return early
  if (!user) {
    return errorMessage;
  }
  // 3. Compare the user's password with the hashed password in the database
  const passwordMatch = await bcrypt.compare(
    validatedFields.data.password,
    user.password,
  );

  // If the password does not match, return early
  if (!passwordMatch) {
    return errorMessage;
  }

  // 4. If login successful, create a session for the user and redirect
  await createSession(user);
}

export async function getCurrentUser() {
  try {
    const user = verifySession();
    return user;
  } catch (error) {
    throw new Error(`Invalid auth token: ${error.message}`);
  }
}

export async function logout() {
  deleteSession();
}
