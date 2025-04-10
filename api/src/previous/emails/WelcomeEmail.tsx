import React from "react";
import { Html, Head, Body, Container, Heading, Text, Link, Img } from "@react-email/components";

interface WelcomeEmailProps {
    firstName: string;
    lastName: string;
}

const WelcomeEmail = ({ firstName, lastName }: WelcomeEmailProps) => {
    return (
        <Html>
            <Head />
            <Body style={{ backgroundColor: "#f3f4f6", color: "#333", fontFamily: "Arial, sans-serif", padding: "0", margin: "0" }}>
                <Container style={{
                    maxWidth: "600px",
                    margin: "auto",
                    padding: "20px",
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    textAlign: "center",
                }}>
                    {/* En-tête avec une image */}
                    <div style={{
                        background: "linear-gradient(90deg, #ff7e5f, #feb47b)",
                        padding: "20px",
                        borderRadius: "10px 10px 0 0",
                        color: "#fff",
                        fontSize: "20px",
                        fontWeight: "bold",
                    }}>
                        🎉 Bienvenue chez Sublime World, {firstName} ! 🎉
                    </div>

                    {/* Image de bienvenue */}
                    <Img
                        src="https://firebasestorage.googleapis.com/v0/b/tony-portfolio-e4e57.appspot.com/o/sw-mail%2Fmail-welcome.png?alt=media&token=5a88888c-4d1d-4d0d-b31e-760b0846552e"
                        alt="Welcome Banner"
                        width="100%"
                        style={{ borderRadius: "10px", marginTop: "10px" }}
                    />

                    {/* Message principal */}
                    <Text style={{ fontSize: "18px", fontWeight: "bold", marginTop: "20px", color: "#444" }}>
                        Nous sommes ravis de vous accueillir ! 🚀
                    </Text>
                    <Text style={{ color: "#666", fontSize: "16px", lineHeight: "1.5" }}>
                        Chez <strong>Sublime World</strong>, nous mettons la technologie au service du progrès en Afrique.  
                        Votre parcours ici sera une aventure enrichissante, remplie d'opportunités et d'innovations.
                    </Text>

                    {/* Bouton d'action */}
                    <div style={{ marginTop: "20px" }}>
                        <Link
                            href="https://sublimworld.com"
                            style={{
                                backgroundColor: "#212121",
                                color: "#FFF4E3",
                                padding: "12px 24px",
                                borderRadius: "6px",
                                fontWeight: "800",
                                textDecoration: "none",
                                display: "inline-block",
                                fontSize: "16px",
                            }}
                        >
                            Découvrez Sublime World 🌍
                        </Link>
                    </div>

                    {/* Message de clôture */}
                    <Text style={{ color: "#555", fontSize: "14px", marginTop: "20px", fontStyle: "italic" }}>
                        Nous sommes impatients de voir ce que nous allons accomplir ensemble.  
                        À très bientôt ! 😊
                    </Text>
                </Container>
            </Body>
        </Html>
    );
};

export default WelcomeEmail;