// For the `clothing_segment_data` type of data
interface ClothingSegmentDataChangesProps {
  right_sleeve_start_front?: number | null;
  right_sleeve_end_front?: number | null;
  right_sleeve_start_back?: number | null;
  right_sleeve_end_back?: number | null;
  left_sleeve_start_front?: number | null;
  left_sleeve_end_front?: number | null;
  left_sleeve_start_back?: number | null;
  left_sleeve_end_back?: number | null;
  right_body_start_front?: number | null;
  right_body_end_front?: number | null;
  right_body_start_back?: number | null;
  right_body_end_back?: number | null;
  left_body_start_front?: number | null;
  left_body_end_front?: number | null;
  left_body_start_back?: number | null;
  left_body_end_back?: number | null;
  sleeves_is_symmetrical?: boolean;
  sleeves_front_back_is_same?: boolean;
  body_is_symmetrical?: boolean;
  body_front_back_is_same?: boolean;
}

export type { ClothingSegmentDataChangesProps };
