import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import {
  Box,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Autocomplete,
  TextField
} from '@mui/material';

import { getSearchOperatorsForType } from '@utils/columnOperators';
import { Button, DateEntry, TextEntry, ButtonColorTypes } from '@ska-telescope/ska-gui-components';
import { ButtonVariantTypes } from '@ska-telescope/ska-gui-components';

const SearchOption = (
  t,
  tColumns,
  availableColumns,
  formFields,
  setFormFields,
  searchSelection,
  setSearchSelection,
  setIsDropdownOpen
) => {
  const handleKeyPairChange = (field: string) => {
    const col = availableColumns.find((c) => c.field === field);
    const defaultOperator = getSearchOperatorsForType(col?.type)[0]?.value ?? 'contains';
    setSearchSelection({
      field: field,
      operator: defaultOperator,
      value: ''
    });
  };

  const handleOperatorChange = (operator: string) => {
    const col = availableColumns.find((c) => c.field === searchSelection.field);
    const op = getSearchOperatorsForType(col?.type).find((o) => o.value === operator);
    const value = (() => {
      if (op?.requiresFilterValue === false) return '';
      return searchSelection.value;
    })();
    console.log(op);
    console.log(operator);
    setSearchSelection({
      field: searchSelection.field,
      operator: operator,
      value: value
    });
  };

  const handleValuePairChange = (event: string) => {
    setSearchSelection({
      field: searchSelection.field,
      operator: searchSelection.operator,
      value: event
    });
  };
  const addSearch = () => {
    setFormFields([...formFields, searchSelection]);
    setSearchSelection({ field: 'string', operator: '>', value: 'string' });
    setIsDropdownOpen(false);
  };

  return (
    <div style={{ padding: '20px 0' }}>
      <Grid
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'stretch'
        }}
        container
        spacing={2}
        direction="row"
        justifyContent="space-between"
      >
        <Grid item xs={4} data-testid={`key-field`}>
          <Autocomplete
            options={availableColumns}
            getOptionLabel={(option) => tColumns(option.field)}
            value={availableColumns.find((col) => col.field === searchSelection.field) || null}
            onChange={(_, newValue) => {
              handleKeyPairChange(newValue?.field || '');
            }}
            renderInput={(params) => {
              const { inputProps, ...rest } = params;
              return (
                <TextField
                  {...rest}
                  label={t('label.key')}
                  inputProps={{
                    ...inputProps,
                    'data-testid': 'textEntry-Key'
                  }}
                />
              );
            }}
            fullWidth
          />
        </Grid>

        {(() => {
          const col = availableColumns.find((c) => c.field === searchSelection.field);
          const operators = getSearchOperatorsForType(col?.type);
          return operators.length > 0 ? (
            <Grid item xs={4} sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
              <FormControl fullWidth data-testid={'operator-select'}>
                <InputLabel id={t('operator-label')}>{t('label.operator')}</InputLabel>
                <Select
                  labelId={t('operator-label')}
                  value={searchSelection.operator}
                  label={t('label.operator')}
                  onChange={(e) => handleOperatorChange(e.target.value as string)}
                >
                  {operators.map((op) => (
                    <MenuItem key={op.value} value={op.value}>
                      {op.value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          ) : null;
        })()}

        {(() => {
          const col = availableColumns.find((c) => c.field === searchSelection.field);
          const op = getSearchOperatorsForType(col?.type).find(
            (o) => o.value === searchSelection.operator
          );
          if (op?.requiresFilterValue === false) return null;
          if (col?.type === 'date') {
            return (
              <Grid
                item
                xs={4}
                data-testid={'value-field'}
                sx={{ height: '100%', display: 'flex', alignItems: 'center', minHeight: '60px' }}
              >
                <DateEntry
                  testId={'dateEntry-value'}
                  label={t('label.value')}
                  setValue={(event: React.SetStateAction<string>) =>
                    handleValuePairChange(event as string)
                  }
                  value={searchSelection.value}
                />
              </Grid>
            );
          }
          return (
            <Grid
              item
              xs={4}
              data-testid={'value-field'}
              sx={{ height: '100%', display: 'flex', alignItems: 'center', minHeight: '60px' }}
            >
              <TextEntry
                ariaTitle="value"
                label={t('label.value')}
                setValue={(event: any) => handleValuePairChange(event)}
                value={searchSelection.value}
              />
            </Grid>
          );
        })()}
      </Grid>
      <Grid item xs={4}>
        <Button
          testId="AddKeyValuePairButton"
          color={ButtonColorTypes.Secondary}
          icon={<LibraryAddOutlinedIcon />}
          label="Add"
          onClick={addSearch}
          toolTip="Add Key/Value pair"
          variant={ButtonVariantTypes.Outlined}
        />
      </Grid>
    </div>
  );
};

export default SearchOption;
