class HttpResponse {
  data: {};
  status: number = 200;

  constructor(data: {}, status: number = 200) {
    this.data = data;
    this.status = status;
  }
}

export { HttpResponse };
