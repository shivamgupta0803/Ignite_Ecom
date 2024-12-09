import { Form } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";

const AddProduct = () => {
  return (
    <div>
      <Form
        method="post"
        className="space-y-4"
        encType="multipart/form-data"
      >
        <div>
          <Label>Name</Label>
          <Input
            type="text"
            name="name"
            placeholder="Enter product name..."
            required
          />
        </div>
        <div>
          <Label>Actual Price</Label>
          <Input
            type="number"
            name="actual_price"
            placeholder="Enter Actual Price..."
            min="0"
            required
          />
        </div>
        <div>
          <Label>Discount Price</Label>
          <Input
            type="number"
            name="discount_price"
            placeholder="Enter Discount Price..."
            min="0"
            required
          />
        </div>
        <div>
          <Label>Content</Label>
          <Textarea
            name="content"
            placeholder="Type your product description here."
            required
          />
        </div>
        <div>
          <Label>Photo</Label>
          <Input
            type="file"
            name="image"
            accept="image/*"
            required
          />
        </div>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
};

export default AddProduct;
