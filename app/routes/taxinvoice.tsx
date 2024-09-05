import React from "react";

const Invoice: React.FC = () => {
  return (
    <div className="w-full h-full pt-12 bg-gray-200">
      <div className="relative overflow-hidden bg-cover bg-no-repeat bg-center bg-fixed w-full h-[350px] shadow-inner bg-[url('http://michaeltruong.ca/images/invoicebg.jpg')]"></div>
      <div className="relative mx-auto mt-[-290px] w-[700px] bg-white shadow-lg">
        {/* Invoice Top Section */}
        <div className="flex justify-between p-8 border-b border-gray-300">
          <div className="flex items-center">
            <div className="w-[60px] h-[60px] bg-[url('http://michaeltruong.ca/images/logo1.png')] bg-cover"></div>
            <div className="ml-4">
              <h2 className="text-xl font-bold">Michael Truong</h2>
              <p className="text-sm text-gray-600">
                hello@michaeltruong.ca <br />
                289-335-6503
              </p>
            </div>
          </div>
          <div className="text-right">
            <h1 className="text-2xl font-semibold">Invoice #1069</h1>
            <p className="text-sm text-gray-600">
              Issued: May 27, 2015 <br />
              Payment Due: June 27, 2015
            </p>
          </div>
        </div>

        {/* Invoice Middle Section */}
        <div className="flex justify-between p-8 border-b border-gray-300">
          <div className="flex items-center">
            <div className="w-[60px] h-[60px] bg-[url('http://michaeltruong.ca/images/client.jpg')] bg-cover rounded-full"></div>
            <div className="ml-4">
              <h2 className="text-xl font-bold">Client Name</h2>
              <p className="text-sm text-gray-600">JohnDoe@gmail.com</p>
              <p className="text-sm text-gray-600">555-555-5555</p>
            </div>
          </div>
          <div className="flex flex-col w-1/2 ml-auto">
            <h2 className="text-lg font-semibold">Project Description</h2>
            <p className="text-sm text-gray-600">
              Proin cursus, dui non tincidunt elementum, tortor ex feugiat enim, at elementum enim quam vel purus. Curabitur semper malesuada urna ut suscipit.
            </p>
          </div>
        </div>

        {/* Invoice Bottom Section */}
        <div className="p-8 border-b border-gray-300">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left border border-gray-300">Item Description</th>
                <th className="p-2 text-left border border-gray-300">Hours</th>
                <th className="p-2 text-left border border-gray-300">Rate</th>
                <th className="p-2 text-left border border-gray-300">Sub-total</th>
              </tr>
            </thead>
            <tbody>
              {[
                { description: "Communication", hours: 5, rate: 75, subtotal: 375 },
                { description: "Asset Gathering", hours: 3, rate: 75, subtotal: 225 },
                { description: "Design Development", hours: 5, rate: 75, subtotal: 375 },
                { description: "Animation", hours: 20, rate: 75, subtotal: 1500 },
                { description: "Animation Revisions", hours: 10, rate: 75, subtotal: 750 },
              ].map((item, index) => (
                <tr key={index} className="border border-gray-300">
                  <td className="p-2">{item.description}</td>
                  <td className="p-2">{item.hours}</td>
                  <td className="p-2">${item.rate}</td>
                  <td className="p-2">${item.subtotal.toFixed(2)}</td>
                </tr>
              ))}
              <tr className="border border-gray-300">
                <td className="p-2"></td>
                <td className="p-2">HST</td>
                <td className="p-2">13%</td>
                <td className="p-2">$419.25</td>
              </tr>
              <tr className="border border-gray-300 bg-gray-100">
                <td></td>
                <td></td>
                <td className="p-2 font-semibold text-right">Total</td>
                <td className="p-2 font-semibold">$3,644.25</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* PayPal Button and Legal Notice */}
        <div className="flex justify-between p-8">
          <form
            action="https://www.paypal.com/cgi-bin/webscr"
            method="post"
            target="_top"
          >
            <input type="hidden" name="cmd" value="_s-xclick" />
            <input type="hidden" name="hosted_button_id" value="QRZ7QTM9XRPJ6" />
            <input
              type="image"
              src="http://michaeltruong.ca/images/paypal.png"
              border="0"
              name="submit"
              alt="PayPal - The safer, easier way to pay online!"
            />
          </form>

          <div className="mt-8">
            <p className="text-xs text-gray-600">
              <strong>Thank you for your business!</strong> Payment is expected
              within 31 days; please process this invoice within that time. There
              will be a 5% interest charge per month on late invoices.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
