import React, {useCallback, useEffect, useMemo, useState} from "react";
import {
    Box, Card, Chip,
    Container,
    FormControl,
    Grid,
    InputLabel,
    makeStyles, MenuItem,
    OutlinedInput,
    Select, TextField,
    Toolbar, Typography
} from "@material-ui/core";

import Page from "src/components/Page";
import axios from "../../config/axios";
import {VictoryChart, VictoryLegend, VictoryLine, VictoryTheme} from "victory";
import {DatePicker} from "@material-ui/pickers";
import {format} from "date-fns";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 600,
        },
    },
};


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

const colors = [
    "#FFD500",
    "#8ACC47",
    "#8F7EE6",
    '#d93651',
    "#FF9F1A",
    "#47CC8A",
    "#FFD500",
    "#30BFBF",
    "#00AAFF",
    "#98AAB3"]
const Estastisticas = () => {
    const classes = useStyles();
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [selectedStart, setSelectedStart] = useState(new Date());
    const [selectedEnd, setSelectedEnd] = useState(new Date());
    const [chartData, setChartData] = useState([])
    const [products, setProducts] = useState([]);

    console.log("SELECTED PRODUCTS", selectedProducts)
    const carregarResumoVendas = useCallback(async () =>  {
        const {data} = await axios.get("/produto/resumo-vendas",{ params: { produtos: selectedProducts.map( item => item.id), inicio: selectedStart.toJSON(), fim: selectedEnd.toJSON() }});

        const chartData = data.map( vendasPorDataProduto => {
            return vendasPorDataProduto.map( vendaPorData => {
                return { x: format(new Date(vendaPorData.data), 'dd/MM/yy'), y: Number(vendaPorData.quantidade), name: vendaPorData.nome}
            })
        })

        setChartData(chartData);
    },[selectedProducts, selectedEnd, selectedStart])
    useEffect(() => {
        return carregarProdutos();
    }, []);
    useEffect(() => {
        if (selectedStart && selectedEnd && selectedProducts.length > 0) {
            carregarResumoVendas()
        }
    }, [selectedStart, selectedEnd, selectedProducts, carregarResumoVendas])
    async function carregarProdutos() {
        const {data} = await axios.get("/produto");
        setProducts(data);
    }
    const handleChange = (event) => {
        const {
            target: {value},
        } = event;
        console.log(event);
        setSelectedProducts(value);
    };
    return (
        <Page title="Estatísticas" className={classes.root}>
            <Container maxWidth={false}>
                <Card style={{padding: 40, paddingTop:10}} >
                    <Toolbar/>
                    <Grid style={{paddingTop: 0}}>
                        <Typography variant={'h1'} style={{paddingBottom: 30}}>Resumo de vendas</Typography>
                        <Typography variant={'h4'} style={{paddingBottom: 10}}>Periodo</Typography>
                        <div>
                            <DatePicker
                                label="Selecione a data de inicio"
                                value={selectedStart}
                                style={{marginHorizontal: 10, minWidth: 300, marginRight: 40}}
                                onChange={setSelectedStart}
                                renderInput={(params) => {
                                    console.log("PARAMS", params)
                                    return <TextField value={format(selectedStart, "'Today is a' eeee")}/>
                                }}
                            />
                            <DatePicker
                                label="Selecione a data de termino"
                                value={selectedEnd}
                                style={{marginHorizontal: 10, minWidth: 300}}
                                onChange={setSelectedEnd}
                                renderInput={(params) => <TextField {...params}
                                                                    label={format(selectedEnd, "'Today is a' eeee")}/>}
                            />
                        </div>
                    </Grid>
                    <Grid style={{paddingTop: 20}}>
                        <Typography variant={'h4'} style={{paddingBottom: 10}}>Produtos</Typography>
                        <FormControl style={{minWidth: 300}}>
                            <InputLabel style={{paddingLeft: 10}} id="demo-multiple-chip-label">Selecione os
                                produtos</InputLabel>
                            <Select
                                labelId="demo-multiple-chip-label"
                                id="demo-multiple-chip"
                                multiple
                                value={selectedProducts}
                                onChange={handleChange}
                                input={<OutlinedInput id="select-multiple-chip" label="Selecione os produtos"/>}
                                renderValue={(selected) => {
                                    console.log("SELECTED", selected)
                                    if (!selected) return;
                                    return <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                                        {selected.map((value) => (
                                            <Chip key={value.id} label={value.nome}/>
                                        ))}
                                    </Box>
                                }}

                                MenuProps={MenuProps}
                            >
                                {products.map((item) => (
                                    <MenuItem
                                        key={item.id}
                                        value={item}
                                    >
                                        {item.nome}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <VictoryChart
                            width={500}
                            height={200}
                            minDomain={{ y: 0 }}
                            theme={VictoryTheme.material}
                        >
                            <VictoryLegend x={0} y={0}
                                           orientation="horizontal"
                                           itemsPerRow={2}
                                           gutter={20}
                                           height={300}
                                           width={300}

                                           colorScale={colors}
                                           data={
                                               chartData.map( (item,index) => {
                                                   return { name: item[0].name, color: colors[index]}
                                               })}
                            />
                            {
                                chartData.map( (item,index) => {
                                    return  <VictoryLine
                                        standalone={false}
                                        style={{
                                            data: {stroke: colors[index]},
                                            parent: {border: "1px solid #ccc"}
                                        }}
                                        data={item}
                                    />
                                })
                            }
                        </VictoryChart>
                    </Grid>
                </Card>
            </Container>
        </Page>
    );
};

export default Estastisticas;
