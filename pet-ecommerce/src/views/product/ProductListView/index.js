import React, { useEffect, useState } from "react";
import { Box, Container, Grid, makeStyles } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import Page from "src/components/Page";
import Toolbar from "./Toolbar";
import ProductCard from "./ProductCard";
import data from "./data";
import axios from "../../../config/axios";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  productCard: {
    height: "100%",
  },
}));

const ProductList = () => {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [precificacoes, setPrecificacoes] = useState([]);

  useEffect(() => {
    carregaEstoque();
    carregaPrecificacoes();
  }, []);

  async function carregaEstoque() {
    const { data } = await axios.get("/estoque");
    setProducts(data);
  }

  async function carregaPrecificacoes() {
    const { data } = await axios.get("/precificacao");
    setPrecificacoes(data);
  }

  return (
    <Page className={classes.root} title="Estoque">
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item key={product.id} lg={4} md={6} xs={12}>
                <ProductCard
                  className={classes.productCard}
                  product={product}
                  precificacoes={precificacoes}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        {/* <Box mt={3} display="flex" justifyContent="center">
          <Pagination color="primary" count={3} size="small" />
        </Box> */}
      </Container>
    </Page>
  );
};

export default ProductList;
