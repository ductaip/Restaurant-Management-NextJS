"use client";

import { useAppContext } from "@/components/app-provider";
import { Role } from "@/constants/type";
import { cn, handleErrorApi } from "@/lib/utils";
import { useLogoutMutation } from "@/queries/useAuth";
import { RoleType } from "@/types/jwt.types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface menuType {
  title: string;
  href: string;
  role?: RoleType[];
  hideWhenIsAuth?: boolean;
}

const menuItems: menuType[] = [
  {
    title: "Trang chủ",
    href: "/",
  },
  {
    title: "Order",
    href: "/guest/orders",
    role: [Role.Guest],
  },
  {
    title: "Đơn hàng",
    href: "/guest/menu",
    role: [Role.Guest],
  },
  {
    title: "Đăng nhập",
    href: "/login",
    hideWhenIsAuth: true,
  },
  {
    title: "Quản lý",
    href: "/manage/dashboard",
    role: [Role.Owner, Role.Employee],
  },
];

export default function NavItems({ className }: { className?: string }) {
  const { role, setRole } = useAppContext();
  const logoutMutation = useLogoutMutation();
  const router = useRouter();

  const logout = async () => {
    if (logoutMutation.isPending) return;
    try {
      await logoutMutation.mutateAsync();
      toast.success("Đăng xuất thành công");
      setRole();
      router.push("/");
    } catch (error: any) {
      handleErrorApi({
        error,
      });
    }
  };

  return (
    <>
      {menuItems.map((item) => {
        const isAuth = item?.role && role && item?.role?.includes(role);

        const canShow =
          (!item.role && !item.hideWhenIsAuth) ||
          (!role && item.hideWhenIsAuth);

        if (isAuth || canShow) {
          return (
            <Link href={item.href} key={item.href} className={className}>
              {item.title}
            </Link>
          );
        }
        return null;
      })}
      {role && (
        <div className={cn(className, "cursor-pointer")} onClick={logout}>
          Đăng xuất
        </div>
      )}
    </>
  );
}
