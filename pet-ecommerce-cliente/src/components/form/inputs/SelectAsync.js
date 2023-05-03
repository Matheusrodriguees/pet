// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import React, { useState, useMemo } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { InputAdornment } from '@material-ui/core';

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export default function Asynchronous({
    search,
    getOptionSelected,
    getOptionLabel,
    label,
    id="asynchronous-demo",
    className="",
    onChange,
    value,
    disabled,
    error=false,
    helperText='',
    onInputChange,
    size="medium",
    initialIcon=null,
    inputVariant="outlined",
    placeholder="",
    multiple,
}) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = useMemo(() => {return open && options.length === 0},[open, options.length]);
  const [ isLoading, setIsLoading ] = useState(false);

  React.useEffect(() => {

    (async() => {
        setIsLoading(true)
        const dataOptions = await search()
        await sleep(1e3);
        setOptions(dataOptions)
        setIsLoading(false)
    })();
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
      setIsLoading(false);
    }
  }, [open]);

    return (
        <Autocomplete
            id={id}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            disabled={disabled}
            //   getOptionSelected={(option, value) => option.name === value.name}
            getOptionSelected={getOptionSelected}
            //   getOptionLabel={(option) => option.name}
            getOptionLabel={getOptionLabel}
            options={options}
            loading={isLoading}
            onChange={onChange}
            value={value}
            onInputChange={onInputChange}
            style={{paddingRight: 0}}
            multiple={multiple}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    variant={inputVariant}
                    disabled={disabled}
                    error={error}
                    helperText={helperText}
                    placeholder={placeholder}
                    size={size}
                    
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          isLoading ? <InputAdornment position="end" style={{paddingRight: 0}}><CircularProgress color="inherit" size={20} /></InputAdornment> : initialIcon ? <InputAdornment position="end" style={{paddingRight: 0}}>{initialIcon}</InputAdornment> : null
                        ),
                    }}
                    fullWidth
                    // fullWidth
                    className={className}
                    style={{paddingRight: 0}}
                />
            )}
        />
    );
}