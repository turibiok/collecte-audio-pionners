import React from "react";
import { Html, Head, Body, Container, Heading, Text, Link, Button, Section } from "@react-email/components";

interface VerificationEmailProps {
    verificationUrl: string;
    supportEmail?: string;
}

const VerificationEmail = ({ verificationUrl, supportEmail = "support@subliworld.com" }: VerificationEmailProps) => {
    return (
        <Html>
            <Head />
            <Body style={{ backgroundColor: "#f4f4f4", color: "#000", fontFamily: "Arial, sans-serif", padding: "20px" }}>
                <Container style={{
                    maxWidth: "600px",
                    margin: "0 auto",
                    padding: "20px",
                    backgroundColor: "#ffffff",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                }}>
                    <Heading style={{ fontSize: "20px", fontWeight: "bold", textAlign: "center", color: "#1E40AF" }}>
                        Confirmez votre adresse email
                    </Heading>
                    <Text style={{ fontSize: "16px", color: "#333", textAlign: "center" }}>
                        Bonjour, <br />
                        Merci de vous être inscrit ! Veuillez vérifier votre adresse email en cliquant sur le bouton ci-dessous :
                    </Text>
                    <Section style={{ textAlign: "center", marginTop: "20px" }}>
                        <Button
                            href={verificationUrl}
                            style={{
                                backgroundColor: "#1E40AF",
                                color: "#ffffff",
                                padding: "12px 24px",
                                fontSize: "16px",
                                fontWeight: "bold",
                                textDecoration: "none",
                                borderRadius: "6px",
                                display: "inline-block"
                            }}
                        >
                            Vérifier mon email
                        </Button>
                    </Section>
                    <Text style={{ fontSize: "14px", color: "#666", textAlign: "center", marginTop: "20px" }}>
                        Ce lien expirera dans **24 heures**. Si vous n'avez pas demandé cette vérification, ignorez ce message.
                    </Text>
                    <Text style={{ fontSize: "14px", color: "#666", textAlign: "center", marginTop: "10px" }}>
                        Besoin d'aide ? Contactez-nous à <Link href={`mailto:${supportEmail}`} style={{ color: "#1E40AF", textDecoration: "none" }}>{supportEmail}</Link>
                    </Text>
                    <Text style={{
                        fontSize: "12px",
                        color: "#888",
                        textAlign: "center",
                        marginTop: "30px",
                        borderTop: "1px solid #ddd",
                        paddingTop: "15px"
                    }}>
                        SubliWorld • 123 Avenue de l’Innovation, Cotonou, Bénin <br />
                        © 2024 SubliWorld. Tous droits réservés.
                    </Text>
                </Container>
            </Body>
        </Html>
    );
};

export default VerificationEmail;
