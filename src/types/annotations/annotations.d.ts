export interface DataAnnotation {
  data_product_uid: string;
  annotation_text: string;
  user_principal_name: string;
  timestamp_created?: Date;
  timestamp_modified?: Date;
  annotation_id: number;
}
