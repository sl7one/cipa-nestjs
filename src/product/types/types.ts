export interface SortIndexBody {
  less: {
    productId: string;
    sortIndex: number;
  };
  more: {
    productId: string;
    sortIndex: number;
  };
}
