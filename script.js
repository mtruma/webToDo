
var table = document.getElementById('tableBody');
var text = document.getElementById('addNewText');
var storageData;

var DataObject =
{
  todo: [""],
  done: [false]
};

//window.onload = UpdateTable();

function AddNewToDo()
{
  if (text.value == "")
    alert("Value can not be empty!");
  else
  {
    CreateRow(text.value, false);
    for(i = 0; i < table.rows.length; i++)
    {
      DataObject.todo[i] = table.rows[i].cells[0].innerHTML;
      DataObject.done[i] = table.rows[i].cells[1].lastElementChild.lastElementChild.checked;
    }
    SaveData(DataObject);
  }
}

function CreateRow(todoValue, chkBoxValue)
{
  var row = table.insertRow(table.rows.length);

  var cell = row.insertCell(0);
  cell.innerHTML = todoValue;

  cell = row.insertCell(1);
  cell.innerHTML = '<div class="form-check" align="center"><input type="checkbox" class="form-check-input" onclick="UpdateCheckBox(this)"></div>';
  cell.lastElementChild.lastElementChild.checked = chkBoxValue;

  cell = row.insertCell(2);
  cell.innerHTML = '<a href="javascript:void(0)" onclick="RemoveRow(this)"><span class="far fa-trash-alt"></span></a>';
  cell.style = 'text-align: center;';
}

function RemoveRow(obj)
{
  var index = obj.parentNode.parentNode.rowIndex - 1;
  table.deleteRow(index);
  savedData = JSON.parse(localStorage.getItem("ToDoData"));
  savedData.todo.splice(index, 1);
  savedData.done.splice(index, 1);
  SaveData(savedData);
}

function UpdateTable()
{
  storageData = JSON.parse(localStorage.getItem("ToDoData"));
  for(i = 0; i < storageData.todo.length; i++)
    CreateRow(storageData.todo[i], storageData.done[i]);
}

function SaveData(data)
{
  if (typeof(Storage) !== "undefined")
    localStorage.setItem("ToDoData", JSON.stringify(data));
}

function UpdateCheckBox(obj)
{
  for(i = 0; i < table.rows.length; i++)
  {
    DataObject.todo[i] = table.rows[i].cells[0].innerHTML;
    DataObject.done[i] = table.rows[i].cells[1].lastElementChild.lastElementChild.checked;
  }
  DataObject.done[obj.parentNode.parentNode.parentNode.rowIndex-1] = obj.checked;
  SaveData(DataObject);
}

function Export()
{
    savedData = JSON.parse(localStorage.getItem("ToDoData"));
    var tab_text="<table border='2px'><tr bgcolor='#87AFC6'>";

    var tab = document.getElementById('toDoTable');
    tab_text += "<th>" + tab.rows[0].cells[0].innerHTML + "</th>" +
    "<th>"+ tab.rows[0].cells[1].innerHTML + "</th></tr></thead>";
    for(i = 1; i < tab.rows.length; i++)
      tab_text +="<tbody><tr><td>" + tab.rows[i].cells[0].innerHTML + "</td>" +
      "<td>" + savedData.done[i-1] + "</td>" + "</tr>";

    tab_text = tab_text+"</tbody></table>";
    tab_text = tab_text.replace(/<A[^>]*>|<\/A>/g, "");
    tab_text = tab_text.replace(/<img[^>]*>/gi,"");
    tab_text = tab_text.replace(/<input[^>]*>|<\/input>/gi, "");

    s = window.open('data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(tab_text));

    return (s);
}
//not finished
function Import()
{
  document.getElementById('fileUpload').click();
}
function uploadTable()
{
  var fileInput = document.getElementById("fileUpload");
  var reader = new FileReader();
  reader.onload = function ()
  {
    var s = reader.result;
    document.getElementById('fileDisplayArea').innerHTML = s;
  };

  reader.readAsBinaryString(fileInput.files[0]);
}
