{{- define "ingress_path_prepend" }}
    {{- if $.Values.ingress.namespaced }}
        {{- printf "/%s%s" .Release.Namespace .Values.ingress.pathStart }}
    {{- else }}
        {{- printf "%s" $.Values.ingress.pathStart }}
    {{- end }}
{{- end }}

{{- define "api_chart" }}
    {{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{- define "api_general.labels" }}
helm.sh/chart: "{{ .Chart.Name }}-{{ .Chart.Version }}"
app.kubernetes.io/instance: {{ .Release.Name }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{- define "dashboard_url" }}
    {{- if $.Values.urls.override }}
        {{- printf "%s" $.Values.urls.dashboardurl }}
    {{- else }}
        {{- printf "%s/dashboard" (include "ingress_path_prepend" .) }}
    {{- end }}
{{- end }}

{{- define "api_url" }}
    {{- if $.Values.urls.override }}
        {{- printf "%s" $.Values.urls.apiUrl }}
    {{- else }}
        {{- printf "%s/api" (include "ingress_path_prepend" .) }}
    {{- end }}
{{- end }}

{{- define "dataProductPVCName" }}
    {{- if and (.Values.global) (index .Values.global "data-product-pvc-name") }}
        {{- printf "%s" (index .Values.global "data-product-pvc-name")}}
    {{- else }}
        {{- printf "%s" $.Values.dataProductPVC.name }}
    {{- end }}
{{- end }}