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

import { Button } from "@react-email/button";
import { Item } from "../../types/types";

interface Props {
  userNames: string;
  createdAt: Date;
  phoneNumber: string;
  products: Item[];
  totalPrice: number;
}

function NewOrderEmail({
  userNames = "John Doe",
  createdAt = new Date(),
  phoneNumber = "07888888",
  products = [
    { id: "1", name: "Product 1", price: 100, quantity: 1, size: "XL" },
  ],
  totalPrice = 1000,
}: Props) {
  const date = new Date();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const adminUrl = process.env.ADMIN_URL;
  return (
    <Html>
      <Head />
      <Preview>New Order details from {userNames}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logo}>
            <Row>
              <Column>
                <Img width={60} src={`${baseUrl}/logo1.png`} alt="Logo" />
              </Column>
              <Column>
                <Text style={{ fontSize: "20px", fontWeight: "bold" }}>
                  Umucyo Styles
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
            <Text style={paragraph}>Hello ,</Text>
            <Text style={paragraph}>
              New Order By {userNames}. Here are the details:
            </Text>
            <Container style={table}>
              <Row style={tableHeader}>
                <Column style={tableHeaderCell}>Product</Column>
                <Column
                  style={{ ...tableHeaderCell, ...{ textAlign: "left" } }}
                >
                  Quantity
                </Column>
                <Column style={{ ...tableHeaderCell, ...textRight }}>
                  Price
                </Column>
              </Row>
              {products.map((product) => (
                <Row key={product.id} style={tableRow}>
                  <Column style={tableCell}>{product.name}</Column>
                  <Column style={{ ...tableCell, ...{ textAlign: "center" } }}>
                    {product.quantity.toLocaleString()}
                  </Column>
                  <Column style={{ ...tableCell, ...textRight }}>
                    {product.price.toLocaleString()} Rwf
                  </Column>
                </Row>
              ))}

              <Row style={tableRow}>
                <Column style={tableTotalCell}>
                  Total {products.length !== 0 && `(${products.length})`}:
                </Column>
                <Column style={{ ...tableCell, ...textRight }}>
                  {totalPrice.toLocaleString()} Rwf
                </Column>
              </Row>
            </Container>
            <Row style={{ display: "flex", gap: "5" }}>
              <Column style={bold}>Date Ordered:</Column>
              <Column>{createdAt?.toLocaleDateString()}</Column>
            </Row>
            <Row style={{ display: "flex", gap: "5", width: "100%" }}>
              <Column style={bold}> Contact:</Column>
              <Column> {phoneNumber}</Column>
            </Row>
            <Section
              style={{
                ...paragraph,
                ...{ display: "flex", justifyContent: "center" },
              }}
            >
              <Button style={button} href={`${adminUrl}/admin/orders`}>
                Orders
              </Button>
            </Section>
            <Text style={paragraph}>
              Best,
              <br />
              Support Team
            </Text>
          </Section>
        </Container>

        <Section style={footer}>
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
}

export default NewOrderEmail;

const fontFamily =
  '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif';

const main = {
  backgroundColor: "#efeef1",
  fontFamily,
};
const logo = {
  display: "flex",
  justifyContent: "center",
  alingItems: "center",
  padding: 30,
};

const paragraph = {
  lineHeight: 1.5,
  fontSize: 16,
  color: "#4a4a4a",
};

const content = {
  padding: "20px 30px",
};

const container = {
  maxWidth: "580px",
  margin: "30px auto",
  backgroundColor: "#ffffff",
};

const table = {
  width: "100%",
  borderCollapse: "collapse" as const,
  marginTop: "20px",
  marginBottom: "20px",
  borderRadius: "0.4rem",
};

const tableHeader = {
  backgroundColor: " rgb(31, 41, 55)",
};

const tableHeaderCell = {
  padding: "12px",
  fontWeight: "bold",
  textAlign: "left" as const,
  color: "white",
};

const tableRow = {
  borderBottom: "1px solid #e1e1e1",
};

const tableCell = {
  padding: "12px",
  color: "#4a4a4a",
};

const tableTotalCell = {
  padding: "8px",
  fontWeight: "bold",
  color: "#2c3e50",
};

const textRight = {
  textAlign: "right" as const,
};
const footer = {
  maxWidth: "600px",
  margin: "20px auto 0",
  padding: "20px 0",
  borderTop: "1px solid #e1e1e1",
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
  borderBottom: "1px solid  rgb(31, 41, 55)",
  width: "102px",
};
const bold = {
  fontWeight: 500,
  color: "#2c3e50",
  fontSize: "15px",
};

const button = {
  backgroundColor: "rgb(31, 41, 55)",
  borderRadius: 4,
  color: "#FFF",
  cursor: "pointer",
  padding: "10px 30px",
};
