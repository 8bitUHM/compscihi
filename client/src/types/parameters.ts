export type SearchParameters = {
  search: string;
  location_type: string;
  job_type: string;
  ordering: string;
  page: string;
};

export class Parameters {
  search: string;
  location_type: string;
  job_type: string;
  ordering: string;
  page: string;

  constructor(params: SearchParameters) {
    this.search = params.search;
    this.location_type = params.location_type;
    this.job_type = params.job_type;
    this.ordering = params.ordering;
    this.page = params.page;
  }

  public updateSearch = (search: string): void => {
    this.search = search;
  };

  public updateLocationType = (location_type: string): void => {
    this.location_type = location_type;
  };

  public updateJobType = (job_type: string): void => {
    this.job_type = job_type;
  };

  public updateOrdering = (ordering: string): void => {
    this.ordering = ordering;
  };

  public updatePage = (page: string): void => {
    this.page = page;
  };

  toStringParams = (): string => {
    const params: SearchParameters = {
      search: this.search,
      job_type: this.job_type,
      location_type: this.location_type,
      page: this.page,
      ordering: this.ordering,
    };

    return new URLSearchParams(params).toString();
  };
}
