import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Edit2, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useApp } from "../../context/AppContext";
import type { Product } from "../../types";

const emptyForm = {
  name: "",
  description: "",
  price: "",
  category: "",
  imageUrl: "",
  stock: "",
  active: true,
};

export function ShoppingManager() {
  const { state, addProduct, updateProduct, deleteProduct } = useApp();
  const [form, setForm] = useState(emptyForm);
  const [editItem, setEditItem] = useState<Product | null>(null);
  const [addOpen, setAddOpen] = useState(false);

  const handleAdd = () => {
    if (!form.name || !form.price || !form.category) {
      toast.error("Name, price & category required");
      return;
    }
    addProduct({
      name: form.name,
      description: form.description,
      price: Number(form.price),
      category: form.category,
      imageUrl: form.imageUrl,
      stock: Number(form.stock) || 0,
      active: form.active,
    });
    toast.success("Product added!");
    setForm(emptyForm);
    setAddOpen(false);
  };

  const handleUpdate = () => {
    if (!editItem) return;
    updateProduct(editItem);
    toast.success("Product updated!");
    setEditItem(null);
  };

  const handleDelete = (id: string) => {
    deleteProduct(id);
    toast.success("Product deleted!");
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-heading font-bold text-xl text-gray-900 flex items-center gap-2">
          <ShoppingBag className="h-5 w-5 text-amber-600" /> Shopping Manager
        </h1>
        <Button
          onClick={() => setAddOpen(!addOpen)}
          className="text-gray-900 font-bold text-xs"
          style={{ background: "#FFC107" }}
          data-ocid="shopping.open_modal_button"
        >
          <Plus className="h-4 w-4 mr-1" /> Add Product
        </Button>
      </div>

      {addOpen && (
        <Card className="mb-4 border-amber-300">
          <CardHeader className="pb-2 pt-3">
            <CardTitle className="text-sm">➕ New Product</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">Product Name *</Label>
                <Input
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  className="mt-1"
                  data-ocid="shopping.input"
                />
              </div>
              <div>
                <Label className="text-xs">Category *</Label>
                <Input
                  value={form.category}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, category: e.target.value }))
                  }
                  className="mt-1"
                  data-ocid="shopping.input"
                />
              </div>
              <div>
                <Label className="text-xs">Price (₹) *</Label>
                <Input
                  type="number"
                  value={form.price}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, price: e.target.value }))
                  }
                  className="mt-1"
                  data-ocid="shopping.input"
                />
              </div>
              <div>
                <Label className="text-xs">Stock</Label>
                <Input
                  type="number"
                  value={form.stock}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, stock: e.target.value }))
                  }
                  className="mt-1"
                  data-ocid="shopping.input"
                />
              </div>
            </div>
            <div>
              <Label className="text-xs">Image URL (from gallery)</Label>
              <Input
                value={form.imageUrl}
                onChange={(e) =>
                  setForm((p) => ({ ...p, imageUrl: e.target.value }))
                }
                placeholder="https://..."
                className="mt-1"
                data-ocid="shopping.input"
              />
            </div>
            <div>
              <Label className="text-xs">Description</Label>
              <Textarea
                value={form.description}
                onChange={(e) =>
                  setForm((p) => ({ ...p, description: e.target.value }))
                }
                rows={2}
                className="mt-1"
                data-ocid="shopping.textarea"
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={form.active}
                onCheckedChange={(v) => setForm((p) => ({ ...p, active: v }))}
                data-ocid="shopping.switch"
              />
              <Label className="text-xs">Active (visible in shop)</Label>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleAdd}
                className="text-gray-900 font-semibold"
                style={{ background: "#FFC107" }}
                data-ocid="shopping.submit_button"
              >
                Add Product
              </Button>
              <Button
                variant="outline"
                onClick={() => setAddOpen(false)}
                data-ocid="shopping.cancel_button"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {editItem && (
        <Card className="mb-4 border-blue-300">
          <CardHeader className="pb-2 pt-3">
            <CardTitle className="text-sm">✏️ Edit Product</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">Product Name</Label>
                <Input
                  value={editItem.name}
                  onChange={(e) =>
                    setEditItem({ ...editItem, name: e.target.value })
                  }
                  className="mt-1"
                  data-ocid="shopping.input"
                />
              </div>
              <div>
                <Label className="text-xs">Category</Label>
                <Input
                  value={editItem.category}
                  onChange={(e) =>
                    setEditItem({ ...editItem, category: e.target.value })
                  }
                  className="mt-1"
                  data-ocid="shopping.input"
                />
              </div>
              <div>
                <Label className="text-xs">Price (₹)</Label>
                <Input
                  type="number"
                  value={editItem.price}
                  onChange={(e) =>
                    setEditItem({ ...editItem, price: Number(e.target.value) })
                  }
                  className="mt-1"
                  data-ocid="shopping.input"
                />
              </div>
              <div>
                <Label className="text-xs">Stock</Label>
                <Input
                  type="number"
                  value={editItem.stock}
                  onChange={(e) =>
                    setEditItem({ ...editItem, stock: Number(e.target.value) })
                  }
                  className="mt-1"
                  data-ocid="shopping.input"
                />
              </div>
            </div>
            <div>
              <Label className="text-xs">Image URL</Label>
              <Input
                value={editItem.imageUrl}
                onChange={(e) =>
                  setEditItem({ ...editItem, imageUrl: e.target.value })
                }
                className="mt-1"
                data-ocid="shopping.input"
              />
            </div>
            <div>
              <Label className="text-xs">Description</Label>
              <Textarea
                value={editItem.description}
                onChange={(e) =>
                  setEditItem({ ...editItem, description: e.target.value })
                }
                rows={2}
                className="mt-1"
                data-ocid="shopping.textarea"
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={editItem.active}
                onCheckedChange={(v) => setEditItem({ ...editItem, active: v })}
                data-ocid="shopping.switch"
              />
              <Label className="text-xs">Active</Label>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleUpdate}
                className="text-gray-900 font-semibold"
                style={{ background: "#FFC107" }}
                data-ocid="shopping.save_button"
              >
                Save
              </Button>
              <Button
                variant="outline"
                onClick={() => setEditItem(null)}
                data-ocid="shopping.cancel_button"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm" data-ocid="shopping.table">
            <thead>
              <tr style={{ background: "#FFC107" }}>
                <th className="px-3 py-3 text-left text-xs font-bold text-gray-800">
                  #
                </th>
                <th className="px-3 py-3 text-left text-xs font-bold text-gray-800">
                  Product
                </th>
                <th className="px-3 py-3 text-left text-xs font-bold text-gray-800">
                  Price
                </th>
                <th className="px-3 py-3 text-left text-xs font-bold text-gray-800 hidden sm:table-cell">
                  Category
                </th>
                <th className="px-3 py-3 text-left text-xs font-bold text-gray-800 hidden sm:table-cell">
                  Stock
                </th>
                <th className="px-3 py-3 text-left text-xs font-bold text-gray-800">
                  Status
                </th>
                <th className="px-3 py-3 text-left text-xs font-bold text-gray-800">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {state.products.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-8 text-gray-400"
                    data-ocid="shopping.empty_state"
                  >
                    No products. Add one!
                  </td>
                </tr>
              )}
              {state.products.map((product, idx) => (
                <tr
                  key={product.id}
                  className="border-b border-gray-100 hover:bg-amber-50"
                  data-ocid={`shopping.row.${idx + 1}`}
                >
                  <td className="px-3 py-2 text-xs text-gray-500">{idx + 1}</td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="h-8 w-8 rounded object-cover"
                        />
                      ) : (
                        <div className="h-8 w-8 rounded bg-amber-100 flex items-center justify-center text-lg">
                          🛍️
                        </div>
                      )}
                      <span className="font-semibold text-xs text-gray-800">
                        {product.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-xs font-semibold text-gray-800">
                    ₹{product.price}
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-600 hidden sm:table-cell">
                    {product.category}
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-600 hidden sm:table-cell">
                    {product.stock}
                  </td>
                  <td className="px-3 py-2">
                    <Badge
                      variant={product.active ? "default" : "secondary"}
                      className={`text-[10px] ${product.active ? "bg-green-100 text-green-800" : ""}`}
                    >
                      {product.active ? "Active" : "Inactive"}
                    </Badge>
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7 text-blue-600"
                        onClick={() => setEditItem(product)}
                        data-ocid={`shopping.edit_button.${idx + 1}`}
                      >
                        <Edit2 className="h-3 w-3" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7 text-red-600"
                        onClick={() => handleDelete(product.id)}
                        data-ocid={`shopping.delete_button.${idx + 1}`}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
