"use client";
import { Button } from "@/components/common/button";
import { Input } from "@/components/common/input";
import { Label } from "@/components/common/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/common/tooltip";
import { WalletConnect } from "./WalletConnect";
import { ChevronDown, ChevronUp, Eye, EyeOff, HelpCircle, Loader2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProfileFormData, WalletInfo } from "@/lib/profile";
import { validateEmail, validateUrl } from "@/lib/utils";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";

export default function ProfileForm() {
  const [formData, setFormData] = useState<ProfileFormData>({
    consumerKey: "",
    consumerSecret: "",
    wooEcomWebsiteUrl: "",
  });

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      setFormData((prev) => ({
        ...prev,
        consumerKey: session.user.consumerKey,
        consumerSecret: session.user.consumerSecret,
      }));
    }
  }, [status, session?.user?.consumerKey, session?.user?.consumerSecret]);

  const [errors, setErrors] = useState<Partial<ProfileFormData>>({});
  const [showToken, setShowToken] = useState(false);
  const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    let error = "";
    switch (name) {
      case "wooEcomWebsiteUrl":
        if (!validateUrl(value)) error = "Invalid URL format";
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const { connected } = useWallet();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(errors).some((error) => error !== "")) {
      toast.error("Please correct the errors before submitting.");
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        consumerKey: formData.consumerKey,
        consumerSecret: formData.consumerSecret,
        wooEcomWebsiteUrl: formData.wooEcomWebsiteUrl,
      });

      if (!res!.ok) {
        toast.error(res?.error || "Error updating the data");
        setIsSubmitting(false);
        return;
      }

      if (!connected) {
        toast.error("Please connect your wallet to receive payments");
        setIsSubmitting(false);
        return;
      }

      setIsSubmitting(false);
      toast.success("Profile updated successfully!");
      setTimeout(() => {
        router.push("/products");
      }, 2000);
    } catch (e) {
      console.log(e);
      toast.error("Error updating the data");
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
      <div>
        <Label htmlFor="consumerKey" className="flex items-center">
          WooCommerce Secret Key
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-4 w-4 ml-2 text-gray-400" />
            </TooltipTrigger>
            <TooltipContent>
              <p>
                You can find your WooCommerce API credentials in your store under WooCommerce- Settings - Advanced.
              </p>
            </TooltipContent>
          </Tooltip>
        </Label>
        <div className="relative">
          <Input
            id="consumerKey"
            name="consumerKey"
            type={showToken ? "text" : "password"}
            value={formData.consumerKey}
            onChange={handleInputChange}
            className="pr-10"
            placeholder="ck_**************"
          />
          <button
            type="button"
            onClick={() => setShowToken(!showToken)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
          >
            {showToken ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div>
        <Label htmlFor="consumerSecret">WooCommerce Consumer Secret</Label>
        <Input
          id="consumerSecret"
          name="consumerSecret"
          type="password"
          value={formData.consumerSecret}
          onChange={handleInputChange}
          placeholder="cs_**************"
        />
      </div>

      <div>
        <Label htmlFor="wooEcomWebsiteUrl">WooCommerce Website URL</Label>
        <Input
          id="wooEcomWebsiteUrl"
          name="wooEcomWebsiteUrl"
          type="url"
          value={formData.wooEcomWebsiteUrl}
          onChange={handleInputChange}
          placeholder="https://yourstore.com"
        />
        {errors.wooEcomWebsiteUrl && (
          <p className="text-red-500 text-sm mt-1">{errors.wooEcomWebsiteUrl}</p>
        )}
      </div>

      <div>
        <Label htmlFor="wallet">Connect your wallet to receive payments</Label>
        <WalletConnect
          onConnect={(info) => setWalletInfo(info)}
          onDisconnect={() => setWalletInfo(null)}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          "Save Changes"
        )}
      </Button>
      <ToastContainer position="bottom-right" />
    </form>
  );
}
