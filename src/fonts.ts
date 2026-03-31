import { 
    Outfit, 
    Libre_Caslon_Text 
} from "next/font/google";

export const outfit = Outfit({ 
    subsets: ["latin"], 
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-outfit"
});

export const caslon = Libre_Caslon_Text({ 
    subsets: ["latin"], 
    weight: ["400", "700"],
    variable: "--font-caslon"
});
