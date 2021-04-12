// req
export const crateGraph = {
  id_dashboard: 892823,
  title: 'Errores en login',
  order_index: 0,
  type: 'XY_GRAPH',
  cols: 12,
  description: 'sdsdsd',
  query: 'asdasdasd',
  nameY: 'asasdasd',
  nameX: 'asdasdasd',
}
// response
export const body = {
  result: 'success',
}

// request
export const editOrderIndex = {
  order: [
    {
      order_index: 7, // graphA.order_index,
      id_graph: 34234,
    },
    {
      order_index: 6, // graphA.order_index,
      id_graph: 34234,
    },
    {
      order_index: 6, // graphA.order_index,
      id_graph: 34234,
    },
    {
      order_index: 6, // graphA.order_index,
      id_graph: 34234,
    },
    {
      order_index: 6, // graphA.order_index,
      id_graph: 34234,
    },
    {
      order_index: 6, // graphA.order_index,
      id_graph: 34234,
    },
  ],
}
// response
export const bodyA = {
  result: 'success',
}

// para el GET
// request
export const bodyB = {
  id_graph: 34234,
}
// response
export const getGraph = {
  id_graph: 34234,
  title: 'Errores en login',
  order_index: 0, // real mock use order_index
  type: 'XY_GRAPH',
  cols: 12,
  description: 'sdsdsd',
  query: 'asdasdasd',
  aggregations: [
    {
      name: 'success',
      count: 856,
    },
    {
      name: 'error',
      count: 397,
    },
    {
      name: 'Other',
      count: 230,
    },
    {
      name: 'tft',
      count: 1222,
    },
    {
      name: '44',
      count: 587,
    },
  ],
}

// para el PUT
// request
export const editGraph = {
  id_graph: 34234,
  title: 'Errores en login',
  order_index: 0,
  type: 'XY_GRAPH',
  cols: 12,
  description: 'sdsdsd',
  query: 'asdasdasd',
}

// reponse
export const bodyC = {
  result: 'success',
}

// GET all
// req
export const bodyD = {
  id_dashboard: 892823,
}
// response
export const someGraphs = {
  id_company: 2333434,
  id_dashboard: 892823,
  graphs: [
    {
      id_graph: 34234,
      title: 'Errores en login',
      order_index: 0, // real mock use order_index
      type: 'PIE_GRAPH',
      cols: 12,
      description: 'sdsdsd',
      query: 'asdasdasd',
      aggregations: [
        {
          name: 'success',
          count: 856,
        },
        {
          name: 'error',
          count: 397,
        },
      ],
    },
    {
      id_graph: 34235,
      title: 'Visitas en landing',
      order_index: 1, // real mock use order_index
      type: 'XY_GRAPH',
      cols: 12,
      description: 'sdsdsd',
      query: 'asdasdasd',
      aggregations: [
        {
          name: 'Enero',
          count: 856,
        },
        {
          name: 'Febrero',
          count: 397,
        },
        {
          name: 'Marzo',
          count: 397,
        },
        {
          name: 'Abril',
          count: 455,
        },
        {
          name: 'Mayo',
          count: 468,
        },
        {
          name: 'Junio',
          count: 782,
        },
      ],
    },
    {
      id_graph: 34236,
      title: 'Ventas',
      order_index: 2, // real mock use order_index
      type: 'LINE_GRAPH',
      cols: 12,
      description: 'sdsdsd',
      query: 'asdasdasd',
      aggregations: [
        {
          name: 'Enero',
          count: 1856,
        },
        {
          name: 'Febrero',
          count: 1397,
        },
        {
          name: 'Marzo',
          count: 997,
        },
        {
          name: 'Abril',
          count: 1255,
        },
        {
          name: 'Mayo',
          count: 1268,
        },
        {
          name: 'Junio',
          count: 1582,
        },
      ],
    },
    {
      id_graph: 34237,
      title: 'Top categorías visitados',
      order_index: 3, // real mock use order_index
      type: 'PIE_GRAPH',
      cols: 12,
      description: 'sdsdsd',
      query: 'asdasdasd',
      aggregations: [
        {
          name: 'Celulares',
          count: 2356,
        },
        {
          name: 'Computo',
          count: 2197,
        },
        {
          name: 'Gaming',
          count: 1899,
        },
      ],
    },
    {
      id_graph: 34238,
      title: 'Top más vendido',
      order_index: 4, // real mock use order_index
      type: 'XY_GRAPH',
      cols: 12,
      description: 'sdsdsd',
      query: 'asdasdasd',
      aggregations: [
        {
          name: 'Iphone X',
          count: 897,
        },
        {
          name: 'Samsung Galaxy 21',
          count: 789,
        },
        {
          name: 'Huawei P9',
          count: 666,
        },
      ],
    },
    {
      id_graph: 34239,
      title: 'Porcentaje de abandono de buy-cart',
      order_index: 5, // real mock use order_index
      type: 'XY_GRAPH',
      cols: 12,
      description: 'sdsdsd',
      query: 'asdasdasd',
      aggregations: [
        {
          name: 'Dropped cart',
          count: 67,
        },
      ],
    },
    {
      id_graph: 34240,
      title: 'Porcentaje de retención de clientes respecto a las visitas',
      order_index: 6, // real mock use order_index
      type: 'SCATTER_GRAPH',
      cols: 12,
      description: 'sdsdsd',
      query: 'asdasdasd',
      aggregations: [
        {
          name: 'Enero',
          count: 78,
        },
        {
          name: 'Febrero',
          count: 69,
        },
        {
          name: 'Marzo',
          count: 23,
        },
        {
          name: 'Abril',
          count: 26,
        },
        {
          name: 'Mayo',
          count: 44,
        },
        {
          name: 'Junio',
          count: 53,
        },
      ],
    },
  ],
}

export const emptyGraph = {
  title: '',
  type: 'XY_GRAPH',
  cols: 8,
  description: '',
  query: '',
  aggregations: [],
}
