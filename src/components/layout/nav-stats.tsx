import type { SellerStats } from "@/lib/types";
import { Check, CheckCircle, House, Package, Star, Wallet } from "lucide-react";
import React from "react";

export default function SellerStats() {
  const seller = {
    name: "Aquirty",
    address: "Main Avenue 12th",
    verified: true,
  };
  const stats: SellerStats = {
    delivered: {
      value: 123,
      label: "Orders Delivered",
      icon: <Package size={22} />,
    },
    satisfactionRating: {
      value: 4.5,
      label: "Satisfaction Rating",
      icon: <Star size={22} />,
    },
    balance: {
      value: 1234,
      label: "Balance",
      icon: <Wallet size={22} />,
    },
  };
  return (
    <div className="flex justify-between items-center gap-5">
      <div className="flex flex-col mr-5">
        <p className="text-xl text-black">{seller.name}</p>
        <div className="flex items-center gap-2 text-gray-500 justify-between">
          <div className="flex items-center gap-2">
            <House size={16} />
            <p className="text-sm font-medium">{seller.address}</p>
          </div>
          <div className="flex items-center gap-2">
            {seller.verified ? (
              <>
                <CheckCircle size={16} />
                <p className="text-sm font-medium text-green-500">Verified</p>
              </>
            ) : (
              <>
                <Check size={16} />
                <p className="text-sm font-medium text-red-500">Not Verified</p>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-12">
        {Object.entries(stats).map(([key, stat]) => (
          <div key={key} className="flex items-center gap-4">
            <div className="rounded-lg bg-theme p-3 text-theme-text">
              {stat.icon}
            </div>
            <div>
              <p className="text-xs text-slate-500">{stat.label}</p>
              <p className="text-sm font-medium">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
