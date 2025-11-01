import { Body } from "@react-email/body";
import { Container } from "@react-email/container";
import { Head } from "@react-email/head";
import { Html } from "@react-email/html";
import { Preview } from "@react-email/preview";
import { Img } from "@react-email/img";
import { Section } from "@react-email/section";
import { Row } from "@react-email/row";
import { Text } from "@react-email/text";
import { Column } from "@react-email/column";

interface TwitchResetPasswordEmailProps {
  name: string;
  message: string;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const EmailTemplate = ({
  name,
  message,
}: TwitchResetPasswordEmailProps) => {
  const date = new Date();
  return (
    <Html>
      <Head />
      <Preview>New Message</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logo}>
            <Row>
              <Column>
                <Img width={60} src={`${baseUrl}/logo1.png`} alt="Logo" />
              </Column>
              <Column>
                <Text style={{ fontSize: "20px", fontWeight: "bold" }}>
                  Umucyo Sytles
                </Text>
              </Column>
            </Row>
          </Section>
          <Section style={sectionsBorders}>
            <Row>
              <Column style={sectionBorder} />
              <Column style={sectionCenter} />
              <Column style={sectionBorder} />
            </Row>
          </Section>
          <Section style={content}>
            <Text style={paragraph}>Hi,</Text>
            <Text style={paragraph}>{name} Messaged you</Text>
            <Text
              style={{ ...paragraph, fontStyle: "italic", fontWeight: 600 }}
            >
              {message}
            </Text>

            <Text style={paragraph}>You can reply to them anytime.</Text>
            <Text style={paragraph}>
              Thanks,
              <br />
              Support Team
            </Text>
          </Section>
        </Container>

        <Section style={footer}>
          <Row style={{ width: "25%" }}>
            <Column
              align="right"
              style={{ width: "100%", paddingRight: "4px" }}
            >
              <Img width={23} src={`${baseUrl}/static/instagram.png`} />
            </Column>
            <Column style={{ width: "100%", paddingLeft: "4px" }}>
              <Img width={23} src={`${baseUrl}/static/twitter.png`} />
            </Column>
            <Column style={{ width: "100%", paddingLeft: "4px" }}>
              <Img width={23} src={`${baseUrl}/static/linkedin.png`} />
            </Column>
          </Row>
          <Row>
            <Text style={{ textAlign: "center", color: "#706a7b" }}>
              © {date.getFullYear()}, All Rights Reserved <br />
              Kigali Rwanda
            </Text>
          </Row>
        </Section>
      </Body>
    </Html>
  );
};

export default EmailTemplate;

const fontFamily = "HelveticaNeue,Helvetica,Arial,sans-serif";

const main = {
  backgroundColor: "#efeef1",
  fontFamily,
};

const paragraph = {
  lineHeight: 1.5,
  fontSize: 14,
};

const container = {
  maxWidth: "580px",
  margin: "30px auto",
  backgroundColor: "#ffffff",
};

const footer = {
  maxWidth: "580px",
  margin: "0 auto",
};

const content = {
  padding: "5px 20px 10px 20px",
};

const logo = {
  display: "flex",
  justifyContent: "center",
  alingItems: "center",
  padding: 30,
};

const sectionsBorders = {
  width: "100%",
  display: "flex",
};

const sectionBorder = {
  borderBottom: "1px solid rgb(238,238,238)",
  width: "249px",
};

const sectionCenter = {
  borderBottom: "1px solid rgb(252, 152, 3)",
  width: "102px",
};
