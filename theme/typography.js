import Colors from "./colors";

export default {
  // Standard brødtekst
  body: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: "400",
  },

  // Titeltekst (store overskrifter)
  title: {
    fontSize: 28,
    color: Colors.textGold,
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  // Header mellem størrelse
  header: {
    fontSize: 20,
    color: Colors.text,
    fontWeight: "600",
  },

  // Subtitle
  subtitle: {
    fontSize: 18,
    color: Colors.textSecondary,
    fontWeight: "500",
  },

  // Lille tekst (bruges på knapper, hints, labels osv.)
  small: {
    fontSize: 12,
    color: Colors.subtext,
    fontWeight: "400",
    opacity: 0.9,
  },

  // “sub” – lille info tekst
  sub: {
    fontSize: 14,
    color: Colors.subtext,
    fontWeight: "400",
    opacity: 0.8,
  },
};

