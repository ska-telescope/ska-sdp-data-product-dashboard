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
import { ANNOTATIONS_CARD_HEIGHT, tableHeight } from '@utils/constants';
import getMetaData from '@services/GetMetaData/GetMetaData';
import { useTranslation } from 'react-i18next';
import { SelectedDataProduct } from 'types/dataproducts/dataproducts';

// Keys listed here will never be rendered. Add or remove entries as requirements
const HIDDEN_KEYS: readonly string[] = [
  'interface',
  'sdp_flows',
  'sdp_flow_status',
  'sdp_flow_placeholder'
];

// Display order
const SECTION_ORDER: ReadonlyArray<string> = ['context', 'obscore', 'config', 'files'];

// Adding exection block to config
const MERGE_INTO_CONFIG: readonly string[] = ['execution_block'];

function prepareMetadata(raw: Record<string, unknown>): Array<[string, unknown]> {
  const data = { ...raw };

  // Merge keys into config
  const config: Record<string, unknown> =
    typeof data.config === 'object' && data.config !== null
      ? { ...(data.config as Record<string, unknown>) }
      : {};

  let configModified = false;
  for (const key of Array.from(MERGE_INTO_CONFIG)) {
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
  for (const key of Array.from(HIDDEN_KEYS)) {
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
  return key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

function renderValue(value: unknown): React.ReactNode {
  if (value === null || value === undefined) return '';
  if (typeof value === 'boolean') return value ? 'true' : 'false';
  if (Array.isArray(value)) return value.map((v) => renderValue(v)).join(', ');
  if (typeof value === 'object') {
    return Object.entries(value as Record<string, unknown>)
      .map(([k, v]) => `${formatLabel(k)}: ${renderValue(v)}`)
      .join(', ');
  }
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
    // Primitive arrays (e.g. [0, 8000, 1]) — show as compact comma-separated string
    const allPrimitiveItems = value.every((v) => typeof v !== 'object' || v === null);
    if (allPrimitiveItems) {
      return (
        <Accordion key={key} defaultExpanded data-testid={`metadata-section-${key}`}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle2">
              {`${formatLabel(key)} (${value.length} ${value.length === 1 ? 'item' : 'items'})`}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
              {value.map((v) => renderValue(v)).join(', ')}
            </Typography>
          </AccordionDetails>
        </Accordion>
      );
    }

    const objectItems = value.filter((v) => typeof v === 'object' && v !== null);
    const label = `${formatLabel(key)} (${value.length} ${value.length === 1 ? 'item' : 'items'})`;
    return (
      <Accordion key={key} defaultExpanded data-testid={`metadata-section-${key}`}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle2">{label}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {renderArrayTable(objectItems as Array<Record<string, unknown>>)}
        </AccordionDetails>
      </Accordion>
    );
  }

  // Render as key-value table
  const obj = value as Record<string, unknown>;
  // Check if all values in the object are primitives
  const allPrimitive = Object.values(obj).every((v) => typeof v !== 'object' || v === null);

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
    // Primitive arrays go inline in the table
    if (
      Array.isArray(v) &&
      (v as unknown[]).every((item) => typeof item !== 'object' || item === null)
    ) {
      primitiveEntries[k] = v;
    } else if (typeof v === 'object' && v !== null) {
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

/**
 * Normalise the sdp_flows array into a row array that can be rendered as a
 * table.  Each element of sdp_flows has the shape
 * ``{ sdp_flow: string, sdp_flow_status: string }``.
 */
function normaliseSdpFlows(
  raw: Record<string, unknown>
): Array<{ pb_id: string; flow: string; status: string }> | null {
  let flows: unknown = raw['sdp_flows'];
  // Both paths (in-memory and PostgreSQL) serialise sdp_flows to a JSON string
  // via flatten_dict / json.dumps.  Parse it here before processing.
  if (typeof flows === 'string') {
    try {
      flows = JSON.parse(flows);
    } catch {
      return null;
    }
  }
  if (!flows || !Array.isArray(flows) || flows.length === 0) return null;

  return (flows as Array<Record<string, unknown>>).map((item) => {
    const f = String(item['sdp_flow'] ?? '');
    const status = String(item['sdp_flow_status'] ?? '');
    // Flow key format: "{pb_id}:{kind}:{name}"
    const parts = f.split(':');
    const pb_id = parts[0] ?? '';
    const flowLabel = parts.length > 1 ? parts.slice(1).join(':') : f;
    return { pb_id, flow: flowLabel, status };
  });
}

/**
 * Renders a dedicated "SDP Flows" accordion section when the data product has
 * flow data.  Works for both single-flow (PV) and multi-flow (DLM) cases.
 */
function SdpFlowsSection({ raw }: { raw: Record<string, unknown> }): React.ReactElement | null {
  const rows = normaliseSdpFlows(raw);
  if (!rows || rows.length === 0) return null;

  return (
    <Accordion defaultExpanded data-testid="metadata-section-sdp-flows">
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="subtitle2">
          {`SDP Flows (${rows.length} ${rows.length === 1 ? 'flow' : 'flows'})`}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Processing Block</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Flow</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow key={i}>
                <TableCell sx={{ wordBreak: 'break-all' }}>{row.pb_id}</TableCell>
                <TableCell sx={{ wordBreak: 'break-all' }}>{row.flow}</TableCell>
                <TableCell>{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </AccordionDetails>
    </Accordion>
  );
}

function renderMetadataSections(entries: Array<[string, unknown]>): React.ReactNode[] {
  const elements: React.ReactNode[] = [];
  let primitiveGroup: Record<string, unknown> = {};

  function flushPrimitives() {
    if (Object.keys(primitiveGroup).length > 0) {
      elements.push(
        <Accordion
          key={`primitive-group-${Object.keys(primitiveGroup)[0]}`}
          defaultExpanded
          data-testid="metadata-section-overview"
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle2">Overview</Typography>
          </AccordionSummary>
          <AccordionDetails>{renderKeyValueTable(primitiveGroup)}</AccordionDetails>
        </Accordion>
      );
      primitiveGroup = {};
    }
  }

  for (const [key, value] of entries) {
    if (value !== null && value !== undefined && typeof value === 'object') {
      flushPrimitives();
      elements.push(renderSection(key, value));
    } else {
      primitiveGroup[key] = value;
    }
  }
  flushPrimitives();

  return elements;
}

function MetadataCard(selectedDataProduct: SelectedDataProduct) {
  const [metaData, setMetaData] = React.useState<Record<string, unknown> | null>(null);
  const [oldFilename, setOldFilename] = React.useState(null);
  const [cardHeight, setCardHeight] = React.useState(tableHeight() - ANNOTATIONS_CARD_HEIGHT);
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
      setCardHeight(tableHeight() - ANNOTATIONS_CARD_HEIGHT);
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Box m={1}>
      <Card variant="outlined" sx={{ maxHeight: cardHeight! }}>
        <CardHeader title={t('label.metaData')} />
        <CardContent sx={{ overflow: 'auto', maxHeight: cardHeight - 80 }}>
          {metaData ? (
            <>
              <SdpFlowsSection raw={metaData} />
              {renderMetadataSections(prepareMetadata(metaData))}
            </>
          ) : (
            <Typography variant="body2" color="text.secondary">
              {t('prompt.selectDataProduct')}
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
