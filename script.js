
var table = document.getElementById('tableBody');
var text = document.getElementById('addNewText');
var storageData = [];

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
    var tab = document.getElementById('toDoTable');
    var tab_text="<tr>";
    for (i = 1; i < tab.rows.length; i++)
    {
      if (savedData.todo[i-1] != savedData.todo[i])
      {
        if (savedData.done[i-1] == true)
          tab_text += "<td>" + tab.rows[i].cells[0].innerHTML + "</td><td>" + '<div class="form-check" align="center"><input type="checkbox" class="form-check-input" onclick="UpdateCheckBox(this)" checked></div>' + "</td>";
        else
          tab_text += "<td>" + tab.rows[i].cells[0].innerHTML + "</td><td>" + '<div class="form-check" align="center"><input type="checkbox" class="form-check-input" onclick="UpdateCheckBox(this)"></div>' + "</td>";
        tab_text += '<td style="text-align:center;"><a href="javascript:void(0)" onclick="RemoveRow(this)"><span class="far fa-trash-alt"></span></a></td></tr>';
      }
    }
    data = window.open('data:text/dat;charset=utf-8,' + encodeURIComponent(tab_text), "SaveData");
    return (data);
}

function Import()
{
  document.getElementById('fileUpload').click();
}
function UpdateTable()
{
  var fileInput = document.getElementById("fileUpload");
  var reader = new FileReader();
  reader.onload = function ()
  {
    document.getElementById('tableBody').innerHTML = reader.result;
    for(i = 0; i < table.rows.length; i++)
    {
      DataObject.todo[i] = table.rows[i].cells[0].innerHTML;
      DataObject.done[i] = table.rows[i].cells[1].lastElementChild.lastElementChild.checked;
    }
    SaveData(DataObject);
  };

  reader.readAsText(fileInput.files[0]);
}
