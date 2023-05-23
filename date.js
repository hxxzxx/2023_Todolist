const date = document.querySelector(".date");

function getdate()
{
    const dt = new Date();
    const month = String(dt.getMonth()+1);
    const day = String(dt.getDate());

    date.innerText=`${month}월 ${day}일`;
}

getdate();
