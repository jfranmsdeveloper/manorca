import ReactGA from "react-ga4";

const GA_MEASUREMENT_ID = "G-XXXXXXXXXX"; // Placeholder: User needs to replace this

export const initGA = () => {
    if (process.env.NODE_ENV === "production") {
        ReactGA.initialize(GA_MEASUREMENT_ID);
    }
};

export const logPageView = () => {
    if (process.env.NODE_ENV === "production") {
        ReactGA.send({ hitType: "pageview", page: window.location.pathname });
    }
};

export const logEvent = (category: string, action: string, label?: string) => {
    if (process.env.NODE_ENV === "production") {
        ReactGA.event({
            category,
            action,
            label,
        });
    }
};
