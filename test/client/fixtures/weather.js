export const torontoResponse = {
  lbl_updatetime: "Updated on",
  updatetime: "Sun Aug 25 5:35 AM",
  updatetime_stamp_gmt: "1566725700000",
  wxcondition: "Partly cloudy",
  icon: "20",
  inic: "iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAMAAADzjKfhAAAAUVBMVEUAAACiqJfS0tSlqpqmq57IycWeopm4ubmxs62rsp3GyMTp6uqtsqTt7e7S09WorpvV1tfDxrvx8fPU1NbAwsPU1NXc3d7d3d7y8vL5+fqutKJhpsxzAAAAGHRSTlMACtaVcUo0Kfvy6eXSzcW6r6eQdWNdLhUxPvTSAAAAOElEQVQI1w2JtwHAIBDE7h8wzjY57D8op0IqBOJLA8T5OJ4Kd6ar9x9hV301w87b2I3fHB9DRKgFNe4BmEC9TmAAAAAASUVORK5CYII=",
  temperature: "16",
  feels_like: "16",
  temperature_unit: "C",
  placecode: "CAON0696"
};

export const formattedTorontoResponse = {
  condition: torontoResponse.wxcondition,
  icon: torontoResponse.icon,
  feelsLike: torontoResponse.feels_like,
  updatedAt: torontoResponse.lbl_updatetime,
  updatedAtTimestamp: torontoResponse.updatetime_stamp_gmt,
  temperature: torontoResponse.temperature,
  temperatureUnit: torontoResponse.temperature_unit
};