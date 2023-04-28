export const userColumns = [
  { field: "quizNumber", headerName: "ID", width: 100 },

  {
    field: "category",
    headerName: "Topic",
    width: 200,
  },
  {
    field: "question",
    headerName: "Question",
    width: 300,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,
    renderCell: (params) => {
      return new Date(params.row.createdAt * 1000).toDateString();
    },
  },
  {
    field: "updatedAt",
    headerName: "Updated At",
    width: 200,
    renderCell: (params) => {
      return new Date(params.row.updatedAt * 1000).toDateString();
    },
  },

  // {
  //   field: "totalMark",
  //   headerName: "Total Mark",
  //   width: 100,
  // },

  // {
  //   field: "createdAt",
  //   headerName: "Created At",
  //   width: 150,
  //   renderCell: (params) => {
  //     return <div>{new Date(params.updatedAt * 1000)}</div>;
  //   },
  // },
  // {
  //   field: "updatedAt",
  //   headerName: "Updated At",
  //   width: 150,
  //   renderCell: (params) => {
  //     return <div>{new Date(params * 1000)}</div>;
  //   },
  // },
];

//temporary data
export const userRows = [
  {
    id: 123,
    topic: "Arrays",
    totalMark: 100,
    date: new Date("2022-10-05"),
  },
  {
    id: 456,
    topic: "Linked Lists",
    totalMark: 100,
    date: new Date("2022-10-12"),
  },
  {
    id: 789,
    topic: "Stacks",
    totalMark: 100,
    date: new Date("2022-10-19"),
  },
  {
    id: 234,
    topic: "Queues",
    totalMark: 100,
    date: new Date("2022-10-26"),
  },
  {
    id: 567,
    topic: "Trees",
    totalMark: 100,
    date: new Date("2022-11-02"),
  },
];
