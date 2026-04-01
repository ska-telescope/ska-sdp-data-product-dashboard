import * as React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { shellSize, FILTERCARDHEIGHT } from '@utils/constants';
import getMetaData from '@services/GetMetaData/GetMetaData';
import { useTranslation } from 'react-i18next';
import { SelectedDataProduct } from 'types/dataproducts/dataproducts';

// Keys listed here will never be rendered. Add or remove entries as requirements
const HIDDEN_KEYS: ReadonlySet<string> = new Set(['interface']);

// Display order
const SECTION_ORDER: ReadonlyArray<string> = ['context', 'obscore', 'config', 'files'];

// Adding exection block to config
const MERGE_INTO_CONFIG: ReadonlySet<string> = new Set(['execution_block']);

function prepareMetadata(
  raw: Record<string, unknown>
): Array<[string, unknown]> {
  const data = { ...raw };

  // Merge keys into config
  const config: Record<string, unknown> =
    typeof data.config === 'object' && data.config !== null
      ? { ...(data.config as Record<string, unknown>) }
      : {};

  let configModified = false;
  for (const key of MERGE_INTO_CONFIG) {
    if (key in data) {
      config[key] = data[key];
      delete data[key];
      configModified = true;
    }
  }
  if (configModified || Object.keys(config).length > 0) {
    data.config = config;
  }

  // Remove hidden keys
  for (const key of HIDDEN_KEYS) {
    delete data[key];
  }

  // Order sections
  const ordered: Array<[string, unknown]> = [];
  for (const key of SECTION_ORDER) {
    if (key in data) {
      ordered.push([key, data[key]]);
      delete data[key];
    }
  }
  // Append any remaining keys not in the explicit order
  for (const [key, value] of Object.entries(data)) {
    ordered.push([key, value]);
  }

  return ordered;
}

function formatLabel(key: string): string {
  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function renderValue(value: unknown): React.ReactNode {
  if (value === null || value === undefined) return '';
  if (typeof value === 'boolean') return value ? 'true' : 'false';
  return String(value);
}

function renderKeyValueTable(obj: Record<string, unknown>) {
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell sx={{ fontWeight: 'bold' }}>Field</TableCell>
          <TableCell sx={{ fontWeight: 'bold' }}>Value</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Object.entries(obj).map(([key, value]) => (
          <TableRow key={key}>
            <TableCell>{formatLabel(key)}</TableCell>
            <TableCell sx={{ wordBreak: 'break-all' }}>{renderValue(value)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function renderArrayTable(arr: Array<Record<string, unknown>>) {
  if (arr.length === 0) return <Typography variant="body2">No items</Typography>;
  const columns = Object.keys(arr[0]);
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          {columns.map((col) => (
            <TableCell key={col} sx={{ fontWeight: 'bold' }}>
              {formatLabel(col)}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {arr.map((row, idx) => (
          <TableRow key={idx}>
            {columns.map((col) => (
              <TableCell key={col} sx={{ wordBreak: 'break-all' }}>
                {renderValue(row[col])}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function renderSection(key: string, value: unknown) {
  if (value === null || value === undefined) return null;

  // Shown as a standalone accordion with the value as content
  if (typeof value !== 'object') {
    return (
      <Accordion key={key} defaultExpanded data-testid={`metadata-section-${key}`}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle2">{formatLabel(key)}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
            {renderValue(value)}
          </Typography>
        </AccordionDetails>
      </Accordion>
    );
  }

  // Render as a table
  if (Array.isArray(value)) {
    const objectItems = value.filter((v) => typeof v === 'object' && v !== null);
    const label = `${formatLabel(key)} (${value.length} ${value.length === 1 ? 'item' : 'items'})`;
    return (
      <Accordion key={key} defaultExpanded data-testid={`metadata-section-${key}`}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle2">{label}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {objectItems.length > 0
            ? renderArrayTable(objectItems as Array<Record<string, unknown>>)
            : value.map((v, i) => (
                <Typography key={i} variant="body2">
                  {renderValue(v)}
                </Typography>
              ))}
        </AccordionDetails>
      </Accordion>
    );
  }

  // Render as key-value table
  const obj = value as Record<string, unknown>;
  // Check if all values in the object are primitives
  const allPrimitive = Object.values(obj).every(
    (v) => typeof v !== 'object' || v === null
  );

  if (allPrimitive) {
    return (
      <Accordion key={key} defaultExpanded data-testid={`metadata-section-${key}`}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle2">{formatLabel(key)}</Typography>
        </AccordionSummary>
        <AccordionDetails>{renderKeyValueTable(obj)}</AccordionDetails>
      </Accordion>
    );
  }

  // Render primitives as table, nested objects as sub-sections
  const primitiveEntries: Record<string, unknown> = {};
  const nestedEntries: Array<[string, unknown]> = [];
  Object.entries(obj).forEach(([k, v]) => {
    if (typeof v === 'object' && v !== null) {
      nestedEntries.push([k, v]);
    } else {
      primitiveEntries[k] = v;
    }
  });

  return (
    <Accordion key={key} defaultExpanded data-testid={`metadata-section-${key}`}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="subtitle2">{formatLabel(key)}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {Object.keys(primitiveEntries).length > 0 && renderKeyValueTable(primitiveEntries)}
        {nestedEntries.map(([k, v]) => renderSection(k, v))}
      </AccordionDetails>
    </Accordion>
  );
}

function MetadataCard(selectedDataProduct: SelectedDataProduct) {
  const [metaData, setMetaData] = React.useState<Record<string, unknown> | null>(null);
  const [oldFilename, setOldFilename] = React.useState(null);
  const [cardHeight, setCardHeight] = React.useState(
    window.innerHeight - shellSize() - FILTERCARDHEIGHT
  );
  const { t } = useTranslation('dpd');

  React.useEffect(() => {
    const metaDataFile = selectedDataProduct?.uid;

    async function loadMetaData() {
      if (metaDataFile) {
        const results = await getMetaData(selectedDataProduct);
        setMetaData(results);
        setOldFilename(metaDataFile);
      }
    }

    if (metaDataFile && metaDataFile.length) {
      if (oldFilename !== metaDataFile) {
        loadMetaData();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDataProduct?.uid]);

  React.useEffect(() => {
    function handleResize() {
      setCardHeight(window.innerHeight - shellSize() - FILTERCARDHEIGHT);
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Box m={1}>
      <Card variant="outlined" sx={{ maxHeight: cardHeight }}>
        <CardHeader title={t('label.metaData')} />
        <CardContent sx={{ overflow: 'auto', maxHeight: cardHeight - 80 }}>
          {metaData ? (
            prepareMetadata(metaData).map(([key, value]) => renderSection(key, value))
          ) : (
            <Typography variant="body2" color="text.secondary">
              {t('prompt.selectDataProduct', 'Select a data product to view its metadata.')}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default React.memo(MetadataCard, (prevProps, nextProps) => {
  // Only re-render if the uid actually changed
  return (
    prevProps.uid === nextProps.uid && prevProps.relativePathName === nextProps.relativePathName
  );
});
