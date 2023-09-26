const codeBackground = document.getElementById("code-background");

function generateRandomCodeLine() {
    const codeTemplates = [
        "using System;",
        "namespace MyNamespace {",
        "    class Program {",
        "        static void Main(string[] args) {",
        "            int num1 = 5;",
        "            int num2 = 10;",
        "            int sum = num1 + num2;",
        "            Console.WriteLine(\"The sum is: \" + sum);",
        "            if (sum > 15) {",
        "                Console.WriteLine(\"Sum is greater than 15\");",
        "            else if (sum < 10) {",
        "                Console.WriteLine(\"Sum is less than 10\");",
        "            else {",
        "                Console.WriteLine(\"Sum is between 10 and 15\");",
        "            for (int i = 0; i < 5; i++) {",
        "                Console.WriteLine(\"Iteration: \" + i);",
        "            }",
        "            while (sum < 100) {",
        "                sum += 10;",
        "                Console.WriteLine(\"Updated sum: \" + sum);",
        "            }",
        "            string[] colors = {\"Red\", \"Green\", \"Blue\"};",
        "            foreach (string color in colors) {",
        "                Console.WriteLine(\"Color: \" + color);",
        "            }",
        "            int[] numbers = new int[3];",
        "            numbers[0] = 1;",
        "            numbers[1] = 2;",
        "            numbers[2] = 3;",
        "            Console.WriteLine(\"Numbers: \" + string.Join(\", \", numbers));",
        "            List<string> fruits = new List<string>();",
        "            fruits.Add(\"Apple\");",
        "            fruits.Add(\"Banana\");",
        "            fruits.Add(\"Orange\");",
        "            foreach (string fruit in fruits) {",
        "                Console.WriteLine(\"Fruit: \" + fruit);",
        "            }",
        "            public class Person {",
        "                public string Name { get; set; }",
        "                public int Age { get; set; }",
        "                public Person(string name, int age) {",
        "                    Name = name;",
        "                    Age = age;",
        "                }",
        "                public void SayHello() {",
        "                    Console.WriteLine(\"Hello, my name is \" + Name);",
        "                }",
        "            }",
        "            Person person1 = new Person(\"Alice\", 25);",
        "            Person person2 = new Person(\"Bob\", 30);",
        "            person1.SayHello();",
        "            person2.SayHello();",
        "            Dictionary<string, int> scores = new Dictionary<string, int>();",
        "            scores[\"Alice\"] = 95;",
        "            scores[\"Bob\"] = 88;",
        "            scores[\"Charlie\"] = 72;",
        "            foreach (var pair in scores) {",
        "                Console.WriteLine(\"Name: \" + pair.Key + \", Score: \" + pair.Value);",
        "            }",
        "            try {",
        "                int result = 10 / 0;",
        "            catch (Exception ex) {",
        "                Console.WriteLine(\"Error: \" + ex.Message);",
        "            }",
        "            int[] nums = {1, 2, 3, 4, 5};",
        "            var evenNums = nums.Where(n => n % 2 == 0);",
        "            foreach (var num in evenNums) {",
        "                Console.WriteLine(\"Even number: \" + num);",
        "            }",
        "        }",
        "    }",
        "}"
    ];

    const randomTemplate = codeTemplates[Math.floor(Math.random() * codeTemplates.length)];

    return randomTemplate;
}

function animateCode() {
    setInterval(() => {
        const codeLine = document.createElement("pre"); // Use <pre> instead of <div>
        codeLine.className = "code-line";
        codeLine.textContent = generateRandomCodeLine();

        codeBackground.appendChild(codeLine); // Add a new line at the bottom

        if (codeBackground.childElementCount > 15) {
            codeBackground.removeChild(codeBackground.firstChild); // Remove the first line
        }
    }, 100); // Adjust the interval for scrolling speed
}

// Initialize the code animation
animateCode();
