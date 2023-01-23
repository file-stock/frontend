import Link from "next/link";

const NavBar = () => {
  const navigationLinks = [
    { label: "Home", href: "/" },
    { label: "Search", href: "/search" },
    { label: "Sign Up", href: "/signUp" },
    { label: "Login", href: "/login" },
    { label: "Creator Profile", href: "/creatorProfile" },
  ];
  return (
    <div className="flex justify-around mt-5 mb-10">
      {navigationLinks.map((link, i) => {
        return (
          <div key={i} className="text-green-900">
            <Link href={link.href}>{link.label}</Link>
          </div>
        );
      })}
    </div>
  );
};

export default NavBar;
