import { DrawerVisiblityProvider } from "@/common/contexts/DrawerVisibilityContext";
import SearchBar from "@/components/filter/inventory/SearchBar";
import PurchaseOrderTable from "@/components/table/purchase-order/PurchaseOrderTable";
import { Button, Col, Row } from "antd";
import Title from "antd/es/typography/Title";

const PurchaseOrder = () => {
  return (
    <>
      <DrawerVisiblityProvider value={{}}>
        {/* <SelectedDataProvider value={{}}> */}
        <Row justify={"space-between"}>
          <Title level={2}>PURCHASE ORDER</Title>
          <Row>
            <SearchBar
              getValueOnChange={() => {}}
              getValueOnClick={() => {}}
              sortedAndSearchedItems={[]}
              type="inventory"
            />
            <Col>
              <Button
                style={{ height: "40px", marginLeft: "10px" }}
                onClick={() => {
                  // add?.setVisible(true);
                }}
              >
                Orders
              </Button>
              <Button
                type="primary"
                style={{ height: "40px", marginLeft: "10px" }}
                onClick={() => {
                  // add?.setVisible(true);
                }}
              >
                Add Supplier
              </Button>
            </Col>
          </Row>
        </Row>
        <Row
          style={{
            marginTop: "1rem",
            height: "81vh",
            overflowY: "auto",
            display: "flex",
            flexFlow: "row wrap",
            position: "relative",
          }}
        >
          <PurchaseOrderTable />
        </Row>
      </DrawerVisiblityProvider>
    </>
  );
};

export default PurchaseOrder;
