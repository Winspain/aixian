$(function () {
  let $div = $("<div></div>");
  $div.css({
    "border-top-left-radius": "34px",
    "border-bottom-left-radius": "34px",
    background: "linear-gradient(140.91deg, #FF87B7 12.61%, #EC4C8C 76.89%)",
    height: "34px",
    width: "45px",
    margin: "1px",
    display: "flex",
    "align-items": "center",
    position: "fixed",
    right: "0px",
    top: `70px`,
    cursor: "pointer",
  });
  $div.html(
    `
      <span style='color:white;font-size:15px;margin-left:10px'>换车</span>
    `
  );
  $("body").append($div);
  $div.click(function () {
    window.location.href = "/list";
  });

  let svgHtml = `<svg width="25" height="25" t="1718635944826" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1498" width="64" height="64"><path d="M483.22878 655.823352h57.54244c111.007011 0 201.343279-90.334221 201.343278-201.356581V224.375808c0-111.035664-90.336267-201.356582-201.343278-201.356581h-57.54244c-111.007011 0-201.342255 90.321941-201.342255 201.356581v230.091986c0 111.021337 90.335244 201.355558 201.342255 201.355558z m-143.815165-287.632378h115.054179v-57.539369H339.413615v-57.512763h115.054179v-57.53937H342.319799c13.370492-65.560027 71.459376-115.03883 140.907958-115.038829h57.542439c69.43528 0 127.52314 49.478802 140.894656 115.038829H569.533229v57.53937h115.05418v57.512763H569.533229v57.539369h115.05418v57.512763H569.533229v57.540393h112.131623c-13.370492 65.559004-71.459376 115.052133-140.894656 115.052133h-57.542439c-69.448583 0-127.537467-49.492105-140.907958-115.052133h112.146972v-57.540393H339.413615v-57.512763z" fill="#e6e6e6" p-id="1499"></path><path d="M799.636471 512.007163v28.763033c0 95.166263-77.412959 172.579222-172.576152 172.579222H396.939681c-95.166263 0-172.577176-77.412959-172.577176-172.579222v-28.763033h-57.527089v28.763033c0 126.876412 103.225806 230.104265 230.104265 230.104265h86.288076v172.579222h-143.815166v57.526067h345.173794v-57.526067h-143.815165V770.875485h86.289099c126.849806 0 230.103242-103.227853 230.103242-230.104265v-28.763034h-57.52709z" fill="#e6e6e6" p-id="1500"></path></svg>`;
  let $div1 = $("<div></div>");
  $div1.css({
    "border-top-left-radius": "34px",
    "border-bottom-left-radius": "34px",
    background: "linear-gradient(140.91deg, #FF87B7 12.61%, #EC4C8C 76.89%)",
    height: "34px",
    width: "40px",
    margin: "1px",
    display: "flex",
    "align-items": "center",
    position: "fixed",
    right: "0px",
    top: `140px`,
    cursor: "pointer",
    paddingLeft: "7px",
  });
  $div1.html(
    // `<span style='color:white;font-size:15px;margin-left:10px'>${svgHtml}语聊</span>`
    svgHtml
  );
  $("body").append($div1);
  $div1.click(function () {
    $.ajax({
      url: "/backend-api/voice_token",
      method: "GET",
      timeout: 0,
    }).done(function (response) {
      window.location.href = `${window.__voiceServer}?c=${window.location.origin}&e=${response.e2ee_key}&t=${response.token}`;
    });
  });

  let $div2 = $("<div></div>");
  $div2.css({
    "border-top-left-radius": "34px",
    "border-bottom-left-radius": "34px",
    background: "linear-gradient(140.91deg, #FF87B7 12.61%, #EC4C8C 76.89%)",
    height: "42px",
    width: "170px",
    margin: "1px",
    display: "flex",
    "align-items": "center",
    position: "fixed",
    right: "0px",
    top: `210px`,
    cursor: "pointer",
    paddingLeft: "7px",
  });
  let deadline = localStorage.getItem("deadline");
  if (!deadline) {
    deadline = "请先登录！";
}
  $div2.html(
    `
      <span style='color:white;font-size:15px;margin-left:10px'>到期时间:<br>${deadline}</span>
    `
  );
  $("body").append($div2);
});
