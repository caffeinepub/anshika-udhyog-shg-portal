import { toast } from "sonner";
import { useApp } from "../context/AppContext";

export function ShoppingPage() {
  const { state } = useApp();
  const activeProducts = state.products.filter((p) => p.active);

  const handleAddToCart = (productName: string) => {
    toast.info(
      `✅ "${productName}" - Feature coming soon! अभी shopping cart का feature आ रहा है।`,
    );
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div
        className="py-10 px-4 text-center"
        style={{
          background: "linear-gradient(135deg, #FFC107 0%, #FF8F00 100%)",
        }}
      >
        <div className="text-4xl mb-3">🛍️</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          SHG Products Shop
        </h1>
        <p className="text-gray-800 text-sm">
          SHG महिलाओं द्वारा निर्मित उत्पाद खरीदें - Handmade with Love
        </p>
      </div>

      <div className="px-4 py-6 max-w-5xl mx-auto">
        {activeProducts.length === 0 ? (
          <div className="text-center py-16" data-ocid="shopping.empty_state">
            <div className="text-5xl mb-4">🛒</div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Shop Coming Soon!
            </h2>
            <p className="text-sm text-gray-500">
              अभी कोई products list नहीं हैं। Admin जल्द products add करेंगे।
            </p>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-600 font-medium mb-4">
              {activeProducts.length} Product
              {activeProducts.length > 1 ? "s" : ""} Available
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {activeProducts.map((product, idx) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow overflow-hidden hover:shadow-md transition-shadow"
                  data-ocid={`shopping.item.${idx + 1}`}
                >
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-40 object-cover"
                    />
                  ) : (
                    <div className="w-full h-40 bg-amber-50 flex items-center justify-center text-5xl">
                      🫙
                    </div>
                  )}
                  <div className="p-3">
                    <h3 className="font-bold text-gray-900 text-sm mb-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-500 mb-2 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-amber-600">
                          ₹{product.price}
                        </span>
                        <span className="text-xs text-gray-400 ml-1">
                          {product.category}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        Stock: {product.stock}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleAddToCart(product.name)}
                      className="mt-2 w-full py-1.5 rounded-lg text-gray-900 font-semibold text-xs transition-opacity hover:opacity-80"
                      style={{ background: "#FFC107" }}
                      data-ocid={`shopping.primary_button.${idx + 1}`}
                    >
                      🛒 Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
