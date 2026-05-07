import { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Camera, Loader2 } from "lucide-react";
import { generateVirtualTryOn, urlToBase64 } from "@/services/tryOnApi";

export default function TryOn() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === id);

  const [userImage, setUserImage] = useState<string | null>(null);
  const [tryOnResult, setTryOnResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 🔹 AI TEXT STATE (NEW, SAFE)
  const [aiSuggestion, setAiSuggestion] = useState<any>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <Button onClick={() => navigate("/catalog")}>
          Back to Catalog
        </Button>
      </div>
    );
  }

  // -----------------------------
  // Upload user photo
  // -----------------------------
  const handleUserUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      setUserImage(ev.target?.result as string);
      setTryOnResult(null);
      setAiSuggestion(null); // reset AI text on new image
    };
    reader.readAsDataURL(file);
  };

  // -----------------------------
  // Generate Try-On (CORE LOGIC)
  // -----------------------------
  const handleTryOn = async () => {
    if (!userImage) return;

    setIsLoading(true);
    try {
      const userImageBase64 = userImage.split(",")[1];
      const clothBase64 = await urlToBase64(product.image);

      const result = await generateVirtualTryOn({
        userImageBase64,
        productImageBase64: clothBase64,
        prompt: "Generate a realistic virtual try-on image.",
      });

      // ✅ CORE RESULT (UNCHANGED)
      setTryOnResult(result);

      // -----------------------------
      // AI TEXT (NON-BLOCKING)
      // -----------------------------
      fetch("http://localhost:5000/ai-suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName: product.name,
          category: product.category,
          material: product.material,
          color: product.colors?.[0] || "neutral",
        }),
      })
        .then((res) => res.json())
        .then(setAiSuggestion)
        .catch(() => null);

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <h1 className="text-3xl font-bold mb-6">Virtual Try-On</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* PRODUCT */}
          <Card>
            <CardContent className="p-4">
              <img
                src={product.image}
                className="w-full rounded mb-2"
                alt={product.name}
              />
              <p>{product.name}</p>
            </CardContent>
          </Card>

          {/* USER PHOTO */}
          <Card>
            <CardContent className="p-4">
              <div className="aspect-square bg-muted flex items-center justify-center mb-3">
                {userImage ? (
                  <img
                    src={userImage}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Camera />
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleUserUpload}
                className="hidden"
              />

              <Button onClick={() => fileInputRef.current?.click()}>
                Upload Your Photo
              </Button>
            </CardContent>
          </Card>

          {/* RESULT */}
          <Card>
            <CardContent className="p-4">
              <div className="aspect-square bg-muted flex items-center justify-center mb-3">
                {isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : tryOnResult ? (
                  <img
                    src={tryOnResult}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Camera />
                )}
              </div>

              <Button
                onClick={handleTryOn}
                disabled={!userImage || isLoading}
                className="w-full"
              >
                Generate Try-On
              </Button>

              {/* AI TEXT OUTPUT */}
              {aiSuggestion && (
                <div className="mt-4 text-sm space-y-1">
                  <p><b>Fit:</b> {aiSuggestion.fit}</p>
                  <p><b>Style:</b> {aiSuggestion.style}</p>
                  <p><b>Occasion:</b> {aiSuggestion.occasion}</p>
                  <p>
                    <b>Suggested Colors:</b>{" "}
                    {aiSuggestion.recommendedColors?.join(", ")}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
