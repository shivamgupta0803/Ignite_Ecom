import { ActionFunctionArgs, LoaderFunction, redirect } from "@remix-run/node";
import { db } from "~/utils/db.server";
import bcrypt from "bcryptjs";
import { Form, useLoaderData } from "@remix-run/react";
import { authenticator } from "~/utils/auth.server";

// Loader function to check if the user is authenticated and has the 'admin' role
export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);

  // If the user is not authenticated or doesn't have 'admin' role, redirect or return error
  if (!user || user.role !== "admin") {
    return redirect("/access-denied"); // Redirect to an access denied page or show an error message
  }

  return { user };
};

export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData();
  const name = form.get("name") as string;
  const email = form.get("email") as string;
  const password = form.get("password") as string;
  const role = form.get("role") as string;

  const userExists = await db.user.count({
    where: {
      email,
    },
  });

  if (userExists) {
    return { error: "User already exists" };
  } else {
    const hashedPass = await bcrypt.hash(password, 10);

    await db.user.create({
      data: {
        name,
        email,
        password: hashedPass,
        role,
      },
    });

    return redirect("/login");
  }
}

const CreateUser = () => {
  const { user } = useLoaderData<{ user: any }>();

  // Check if the user has the admin role
  if (user?.role !== "admin") {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p>You do not have permission to view this page.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-center font-semibold text-2xl mb-3">Create User</h1>
      <Form
        method="POST"
        className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-72"
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            placeholder="Name"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="text"
            name="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            placeholder="Password"
            required
          />
        </div>

        <div className="mb-6">
          Assign Role:{" "}
          <select name="role" id="role">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-black w-full rounded-lg py-2 px-4 text-white font-semibold focus:outline-none focus:shadow-outline"
          >
            Create User
          </button>
        </div>
      </Form>
    </div>
  );
};

export default CreateUser;
