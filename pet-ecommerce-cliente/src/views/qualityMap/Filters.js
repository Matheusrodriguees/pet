import React, { useEffect } from 'react';

import SelectAsync from 'src/components/form/inputs/SelectAsync'
import {
    Grid
} from '@material-ui/core';
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';


const Filters = ({
    carregarMapa,
    mapa,
    selectedDate,
    setSelectedDate
}) => {
    

    const handleDateChange = (date) => {
      setSelectedDate(date);
    };

    useEffect(() => {
        if(selectedDate){
            carregarMapa(selectedDate.getMonth(), selectedDate.getFullYear())
        }
    },[selectedDate]);


    return (
        <>
            <Grid item xs={3}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
           
                    <KeyboardDatePicker
                        label="Data"
                        views={["month","year"]}
                        disableToolbar
                        variant="inline"
                        inputVariant="outlined"
                        format="MM/yyyy"
                        className="w-full"
                        id="date-picker-inline"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                  
                </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={3}>
                <SelectAsync
                    label="Centro de distribuição"
                    className="w-full"
                    search={async () => []}
                    multiple={false}
                    //getOptionLabel={(carac) => carac.desc_carac_pauta}
                    getOptionLabel="teste"
                    // getOptionSelected={(carac, value) => {
                    //     return carac.id === value
                    // }}
                    getOptionSelected={null}
                    // onChange={(event, carac) => {
                    //     handleChange(carac);
                    // }}
                    onChange={null}
                    inputVariant="outlined"
                    value={null}
                // value={caracDados.carac_substituida}
                />
            </Grid>
            <Grid item xs={3}>
                <SelectAsync
                    label="Produto"
                    className="w-full"
                    search={async () => []}
                    multiple={false}
                    //getOptionLabel={(carac) => carac.desc_carac_pauta}
                    getOptionLabel="teste"
                    // getOptionSelected={(carac, value) => {
                    //     return carac.id === value
                    // }}
                    getOptionSelected={null}
                    // onChange={(event, carac) => {
                    //     handleChange(carac);
                    // }}
                    onChange={null}
                    inputVariant="outlined"
                    value={null}
                // value={caracDados.carac_substituida}
                />
            </Grid>
        </>
    );
};



export default Filters;
