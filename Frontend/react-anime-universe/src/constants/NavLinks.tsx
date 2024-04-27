import { ScrollText, Shell, Star, User } from "lucide-react";

export const navLinks = [
    {
        name: "Profile",
        link: "/profile",
        icon: <User />,
    },
    {
        name: "Your lists",
        link: "/user-collections",
        icon: <ScrollText />,
    },
    {
        name: "Anime",
        link: "/anime",
        icon: <Shell />,
    },
];
