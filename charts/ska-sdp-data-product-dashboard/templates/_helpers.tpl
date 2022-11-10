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