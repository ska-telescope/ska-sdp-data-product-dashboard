{{/*
Selector labels
*/}}
{{- define "ska-dataproduct-dashboard.labels" -}}
app.kubernetes.io/name: {{ $.Chart.Name }}
{{- end }}

{{- define "ska-dataproduct-dashboard.dashboard.labels" -}}
{{ include "ska-dataproduct-dashboard.labels" . }}
app: {{ $.Chart.Name }}-dashboard
{{- end }}

{{- define "ska-dataproduct-dashboard.api.labels" -}}
{{ include "ska-dataproduct-dashboard.labels" . }}
app: {{ $.Chart.Name }}-api
{{- end }}

{{- define "ska-dataproduct-dashboard.permissionsApi.labels" -}}
{{ include "ska-dataproduct-dashboard.labels" . }}
app: {{ $.Chart.Name }}-permissions-api
{{- end }}

{{/*
set the ingress url path
*/}}
{{- define "ska-dataproduct-dashboard.dashboard.ingress.path" }}
{{- if .Values.ingress.namespaced -}}
/{{ .Release.Namespace }}/{{ .Values.dashboard.ingress.path }}
{{- else -}}
/{{ .Values.dashboard.ingress.path}}
{{- end }}
{{- end }}

{{- define "ska-dataproduct-dashboard.api.ingress.path" }}
{{- if .Values.ingress.namespaced -}}
/{{ .Release.Namespace }}/{{ .Values.api.ingress.path }}
{{- else -}}
/{{ .Values.api.ingress.path}}
{{- end }}
{{- end }}

{{- define "ska-dataproduct-dashboard.permissionsApi.ingress.path" }}
{{- if .Values.ingress.namespaced -}}
/{{ .Release.Namespace }}/{{ .Values.permissionsApi.ingress.path }}
{{- else -}}
/{{ .Values.permissionsApi.ingress.path }}
{{- end }}
{{- end }}

{{- define "dataProductPVCName" }}
    {{- if and (.Values.global) (index .Values.global "data-product-pvc-name") }}
        {{- printf "%s" (index .Values.global "data-product-pvc-name")}}
    {{- else }}
        {{- printf "%s" $.Values.dataProductPVC.name }}
    {{- end }}
{{- end }}
