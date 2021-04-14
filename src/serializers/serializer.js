class Serializer {
  filterData(data) {
    const obj = {};

    this.publicFields.forEach((field) => {
      if (Reflect.has(data, field)) {
        obj[field] = data[field];
      }
    });

    return obj;
  }

  filtrar(data) {
    return Array.isArray(data)
      ? data.map((dado) => this.filterData(dado))
      : this.filterData(data);
  }

  serialize(data) {
    const filteredData = this.filtrar(data);
    if (this.contentType === 'json') {
      return JSON.stringify(filteredData);
    }
    return filteredData;
  }
}

module.exports = Serializer;
