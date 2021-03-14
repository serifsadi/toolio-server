export default class FilterService {
  private static instance: FilterService;

  static getInstance() {
    if (!FilterService.instance) {
      FilterService.instance = new FilterService();
    }
    return FilterService.instance;
  }

  filter(data: any[], key: string, keyword: string) {
    return data.filter((it) => it[key].toLowerCase().includes(keyword));
  }
}
