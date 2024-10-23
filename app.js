
var butts_algos = document.querySelectorAll(".algos button");
var inp_as = document.getElementById("slider"), ar_size = inp_as.value;
var gen_ar = document.getElementById("array");
var div_sizes = [];
var divs = [];
var margin_size;
var cont = document.getElementById("array_container");
var sizeLabel = document.querySelector(".range-slider_value");
var speed = document.querySelectorAll("#dot-slider input");


gen_ar.addEventListener("click",generate_array);
inp_as.addEventListener("input", update_array_size);

function generate_array()
{
    cont.innerHTML="";

    for(var i=0; i<ar_size; i++)
    {
        div_sizes[i]=Math.floor(Math.random()*(100-5))+5;
        divs[i]=document.createElement("div");
        cont.appendChild(divs[i]);
        margin_size=0.1;
        divs[i].style=" margin:0% " + margin_size + "%; background-color: #6B48FF; width:" + (100/ar_size-(1*margin_size)) + "%; height:" + (div_sizes[i]) + "%; display: inline-block; border-radius:0px 0px 15px 15px;  transition: 0.7s all ease-in-out;";
    }
}

function update_array_size()
{
    ar_size=inp_as.value;
    sizeLabel.innerHTML = "Length : " + ar_size;
    generate_array();
}

window.onload= update_array_size();

for(let i=0; i<butts_algos.length;i++)
{
    butts_algos[i].addEventListener("click", runalgo);
}

function disable_buttons()
{
    for(var i=0; i<butts_algos.length;i++)
    {
        butts_algos[i].disabled = true;
        gen_ar.disabled = true;
        inp_as.disabled = true;
    }
}

function runalgo()
{
    disable_buttons();
    switch(this.innerHTML)
    {
        case "<b>Bubble Sort</b>": Bubble();
                            break;
        case "<b>Selection Sort</b>": Selection();
                            break;
        case "<b>Insertion Sort</b>": Insertion();
                            break;
        case "<b>Merge Sort</b>": Merge();
                            break;
        case "<b>Quick Sort</b>": Quick();
                            break;
    }
}

function Bubble()
{
    var i, j, temp;
    var n = ar_size;
    c_delay = 0;
    for(i=0; i<n-1;i++)
    {
        for(j=0; j<n-i-1; j++)
        {
            div_update(divs[j], div_sizes[j], "yellow");
            if(div_sizes[j] > div_sizes[j+1])
            {
                div_update(divs[j], div_sizes[j], "red");
                div_update(divs[j+1], div_sizes[j+1], "red");
                
                temp = div_sizes[j];
                div_sizes[j] = div_sizes[j+1];
                div_sizes[j+1] = temp;
                
                div_update(divs[j], div_sizes[j], "red");
                div_update(divs[j+1], div_sizes[j+1], "red");
            }
            div_update(divs[j], div_sizes[j], "blue");
        }
        div_update(divs[j], div_sizes[j], "green");
    }
    div_update(divs[0], div_sizes[0], "green");

    enable_buttons();
}
function Insertion()
{
    c_delay = 0;
    let i, key, j, n=ar_size;
    for(i=1; i<n; i++)
    {
        div_update(divs[i], div_sizes[i], "yellow");
        key = div_sizes[i];
        j = i-1;
        while(j>=0 && div_sizes[j]>key)
        {
            div_update(divs[j], div_sizes[j], "red");
            div_update(divs[j+1], div_sizes[j+1], "red");
            div_sizes[j+1] = div_sizes[j];
            div_update(divs[j], div_sizes[j], "red");
            div_update(divs[j+1], div_sizes[j+1], "red");
            if(j==(i-1))
                div_update(divs[j+1], div_sizes[j+1], "yellow");
            else
                div_update(divs[j+1], div_sizes[j+1], "blue");
            j--; 
        }
    
        div_sizes[j+1] = key;
        
        for(let t = 0; t<i; t++)
        {
            div_update(divs[t], div_sizes[t], "green");
        }    
    }
    div_update(divs[i-1], div_sizes[i-1], "green");
    enable_buttons();
}
function Merge()
{
    c_delay = 0;

    mergeSort(0, ar_size-1);

    enable_buttons();
}

function mergeIt(s, mid, e)
{
    var n1 = mid - s + 1;
    var n2 = e - mid;

    var arr =[];
    var L = new Array(n1);
    var R = new Array(n2);

    for(var i=0; i<n1; i++)
        L[i] = div_sizes[s+i];
    for(var i=0; i<n2; i++)
        R[i] = div_sizes[mid+1+i];

    var i=0, j=0, k=s; 
    while(i<n1 && j<n2)
    {
        if(L[i]<=R[j])
        {
            div_sizes[k]=L[i];
            div_update(divs[k], div_sizes[k], "red");
            i++;
        }
        else
        {
            div_sizes[k]=R[j];
            div_update(divs[k], div_sizes[k], "red");
            j++;
        }
        k++;
    } 
    
    while(i<n1)
    {
        div_sizes[k]= L[i];
        div_update(divs[k], div_sizes[k], "red");
        k++;
        i++;
    }

    while(j<n2)
    {
        div_sizes[k]= R[j];
        div_update(divs[k], div_sizes[k], "red");
        k++;
        j++;
    }

    for(var t=0; t<=e; t++)
    {
        div_update(divs[t], div_sizes[t], "green");
    }

}

function mergeSort(s, e)
{
    if(s<e)
    {
        var mid =  Math.floor(s + (e-s)/2) ;
        div_update(divs[mid],div_sizes[mid],"yellow");

        mergeSort(s, mid);
        mergeSort(mid+1, e);

        mergeIt(s, mid, e);
    }   
}
function* quickSortLomuto(arr) {
    //tricky to understand
    yield* _quickSortLomuto(arr, 0, arr.length - 1);
}

function* _quickSortLomuto(arr, left, right) {
    if (left >= right) {
        return;
    }
    let partitionGenerator = _partitionLomuto(arr, left, right);

    let result = partitionGenerator.next();
    //we need the pivot so wee run this till we the poviot 
    while (!result.done) {
        result = partitionGenerator.next();
        yield 1;
    }

    let idx = result.value;
    yield* _quickSortLomuto(arr, left, idx - 1);
    yield* _quickSortLomuto(arr, idx + 1, right);
}

function Selection()
{
    c_delay = 0;
    var i, j, temp, min, n=ar_size;
    for(i=0; i<n-1; i++)
    {
        div_update(divs[i], div_sizes[i], "red");
        min = i;
        for(j=i+1; j<n; j++)
        {
            div_update(divs[j], div_sizes[j], "yellow");

            if(div_sizes[j]<div_sizes[min])
            {
                if(min!=i)
                {
                    div_update(divs[min], div_sizes[min], "blue");
                }
                min = j;
                div_update(divs[min], div_sizes[min], "red");
            }
            else
                div_update(divs[j], div_sizes[j], "blue");
        }

        if(min!=i)
            {
                temp = div_sizes[min];
                div_sizes[min] = div_sizes[i];
                div_sizes[i] = temp;

                div_update(divs[min], div_sizes[min], "red");
                div_update(divs[i], div_sizes[i], "red");
                div_update(divs[min], div_sizes[min], "blue");
            }
        div_update(divs[i], div_sizes[i], "green");
    }
    div_update(divs[i], div_sizes[i], "green");

    enable_buttons();
}
var delay_time = 1000/(Math.floor(ar_size/10));
var c_delay = 0;
var speed_inp = 0;

for(let i=0; i<speed.length;i++)
{
    speed[i].addEventListener("click", speedModule);
}

function speedModule()
{
    speed_inp = this.value;
    delay_time = 10000/(Math.floor(ar_size/10)*speed_inp);
}

function div_update(cont, height, color)
{
    window.setTimeout(function(){
        cont.style = "margin: 0%"+ margin_size + "%; width:" + (100/ar_size-(2*margin_size)) + "%; height:" + height + "%; background-color:" + color + "; border-radius:0px 0px 15px 15px;  transition: 0.6s all ease-in-out;";
    } , c_delay+=delay_time);
    
}

function enable_buttons()
{
    window.setTimeout(function(){
        for(var i=0; i<butts_algos.length; i++)
        {
            butts_algos[i].disabled = false;
            gen_ar.disabled = false;
            inp_as.disabled = false;
        }
    }, c_delay+=delay_time);
}
