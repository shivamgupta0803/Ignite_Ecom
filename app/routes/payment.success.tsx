import { Link, useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { sendEmailService } from "~/utils/mailer";
import { db } from "~/utils/db.server";
import { authenticator } from "~/utils/auth.server";
import Swal from "sweetalert2";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request);
  if (!user) {
    return redirect("/login");
  }

  return json({ user });
};

const PaymentSuccess = () => {
  const user = useLoaderData();

  useEffect(() => {
    setTimeout(() => {
      Swal.fire({
        title: "Your Order Was Placed!",
        text: "Thank you for order!",
        icon: "success",
      });
    }, 2000);
  }, []);

  return (
    <div className="h-[90vh] flex flex-col items-center justify-center overflow-hidden w-full">
      <div className="bg-white p-6 mg:mx-auto">
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold">
            Your order was successful
          </h3>
          <p className="text-gray-600 my-2">Thank you for your order.</p>
          <p className="text-center">Have a good day!</p>
          <div className="py-10 text-center">
            <Link
              to="/"
              className="px-12 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white font-semibold py-3"
            >
              Go to homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function action({ request }: ActionFunctionArgs) {
  const user = await authenticator.isAuthenticated(request);

  if (!user) {
    return redirect("/login");
  }

  const userData = await db.user.findUnique({
    where: { id: user.id },
    select: { name: true, email: true },
  });
  const formData = await request.formData();
  const values = Object.fromEntries(formData);

  const items = values.cartData as string;
  const itemsArray = JSON.parse(items);
  const totalPrice = values.totalPrice as string;
  console.log("this is totalPrice::", totalPrice);

  const itemListText = `
<div style="width: 100%; height: 100%; padding-top: 12px; background-color: #e5e7eb;">
  <div style="position: relative; overflow: hidden; background-size: cover; background-repeat: no-repeat; background-position: center; background-attachment: fixed; width: 100%; height: 350px; box-shadow: inset 0 0 10px rgba(0,0,0,0.5); background-image: url('http://michaeltruong.ca/images/invoicebg.jpg');"></div>
  <div style="position: relative; margin: auto; margin-top: -290px; width: 700px; background-color: #ffffff; box-shadow: 0 0 15px rgba(0,0,0,0.1);">
    <!-- Invoice Top Section -->
    <div style="display: flex; justify-content: space-between; padding: 32px; border-bottom: 1px solid #d1d5db;">
      <div style="display: flex; align-items: center;">
        <div style="width: 60px; height: 60px; background-image: url('http://michaeltruong.ca/images/logo1.png'); background-size: cover;"></div>
        <div style="margin-left: 16px;">
          <h2 style="font-size: 20px; font-weight: bold;">Shivam Gupta</h2>
          <p style="font-size: 14px; color: #6b7280;">
            shivamgupta08032001@gmail.com <br />
           9967667099
          </p>
        </div>
      </div>
      <div style="text-align: right;">
        <h1 style="font-size: 24px; font-weight: 600;">Invoice #1069</h1>
        <p style="font-size: 14px; color: #6b7280;">
          Issued: ${new Date().toLocaleDateString()}<br />
          Payment Due: Within 30 Days, 2024
        </p>
      </div>
    </div>

    <!-- Invoice Middle Section -->
    <div style="display: flex; justify-content: space-between; padding: 32px; border-bottom: 1px solid #d1d5db;">
      <div style="display: flex; align-items: center;">
        <div style="width: 60px; height: 60px; background-image: url('http://michaeltruong.ca/images/client.jpg'); background-size: cover; border-radius: 50%;"></div>
        <div style="margin-left: 16px;">
            <tr style="border: 1px solid #d1d5db;">
           <h2 style="font-size: 20px; font-weight: bold;">${
             userData?.name
           }</h2>
          <p style="font-size: 14px; color: #6b7280;">${userData?.email}</p>
            <p style="font-size: 14px; color: #6b7280;">555-555-5555</p>
          </tr>
        </div>
      </div>
      <div style="display: flex; flex-direction: column; width: 50%; margin-left: auto;">
        <h2 style="font-size: 18px; font-weight: 600;">Project Description</h2>
        <p style="font-size: 14px; color: #6b7280;">
          Proin cursus, dui non tincidunt elementum, tortor ex feugiat enim, at elementum enim quam vel purus. Curabitur semper malesuada urna ut suscipit.
        </p>
      </div>
    </div>

    <!-- Invoice Bottom Section -->
    <div style="padding: 32px; border-bottom: 1px solid #d1d5db;">
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background-color: #f3f4f6;">
            <th style="padding: 8px; text-align: left; border: 1px solid #d1d5db;">Item</th>
            <th style="padding: 8px; text-align: left; border: 1px solid #d1d5db;">price</th>
            <th style="padding: 8px; text-align: left; border: 1px solid #d1d5db;">Quantity</th>
            <th style="padding: 8px; text-align: left; border: 1px solid #d1d5db;">Amount</th>
          </tr>
        </thead>
        <tbody>
        ${itemsArray
          .map(
            (item: any) => `
            <tr style="border: 1px solid #d1d5db;">
            <td style="padding: 8px;">${item.name}</td>
            <td style="padding: 8px;">₹${item.price}</td>
            <td style="padding: 8px;">₹${item.quantity}</td>
            <td style="padding: 8px;">₹${item.amount}</td>
          </tr>`
          )
          .join("")}
          <tr style="border: 1px solid #d1d5db;">
            <td style="padding: 8px;">Tax</td>
            <td style="padding: 8px;">GST</td>
            <td style="padding: 8px;">18%</td>
            <td style="padding: 8px;">$419.25</td>
          </tr>
          <tr style="border: 1px solid #d1d5db; background-color: #f3f4f6;">
            <td></td>
            <td></td>
            <td style="padding: 8px; font-weight: 600; text-align: right;">Total</td>
            <td style="padding: 8px; font-weight: 600;">${totalPrice}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- PayPal Button and Legal Notice -->
    <div style="display: flex; justify-content: space-between; padding: 32px;">
      <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
        <input type="hidden" name="cmd" value="_s-xclick" />
        <input type="hidden" name="hosted_button_id" value="QRZ7QTM9XRPJ6" />
        <input type="image" src="http://michaeltruong.ca/images/paypal.png" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!" />
      </form>

      <div style="margin-top: 32px;">
        <p style="font-size: 12px; color: #6b7280;">
          <strong>Thank you for your business!</strong> Payment is expected within 31 days; please process this invoice within that time. There will be a 5% interest charge per month on late invoices.
        </p>
      </div>
    </div>
  </div>
</div>
`;

  // Define the recipients array
  const recipients = ["bloggieapp@gmail.com", "sundaram6060@gmail.com"];

  // Adding a delay before sending the email
  setTimeout(async () => {
    await sendEmailService(
      recipients,
      "Diwali Fire Product List",
      itemListText
    );
  }, 2000); // Delay time in milliseconds (e.g., 2000ms = 2 seconds)

  return redirect("/payment/success");
}

export default PaymentSuccess;
