let employees = [
    { employeeCode: "EMP-001", fullName: "Ngô Thanh Tùng", department: "Phòng Kỹ Thuật", age: 28, experienceYears: 5 },
    { employeeCode: "EMP-002", fullName: "Hồ Thị Thu", department: "Phòng Nhân Sự", age: 35, experienceYears: 10 },
    { employeeCode: "EMP-003", fullName: "Mai Quốc Việt", department: "Phòng Kỹ Thuật", age: 24, experienceYears: 1 }
];

function validateEmployeeCode(code) {
    if (code === "") {
        return "Lỗi: Chưa nhập mã nhân viên";
    }
    if (code.length < 6) {
        return "Lỗi: Độ dài nhỏ hơn 6 ký tự";
    }
    if (!code.startsWith("EMP-")) {
        return 'Lỗi: Sai tiền tố "EMP-"';
    }
    if (code.includes(" ")) {
        return "Lỗi: Chứa khoảng trắng";
    }
    if (findEmployeeIndex(code) !== -1) {
        return "Lỗi: Mã nhân viên đã tồn tại";
    }
    return "";
}

function findEmployeeIndex(code) {
    for (let i = 0; i < employees.length; i++) {
        if (employees[i].employeeCode === code) {
            return i;
        }
    }
    return -1;
}

function normalizeText(rawText) {
    const words = rawText.trim().split(" ");
    let result = [];
    for (let word of words) {
        if (word !== "") {
            result.push(word[0].toUpperCase() + word.slice(1).toLowerCase());
        }
    }
    return result.join(" ");
}

function inputIntegerInRange(message, min, max) {
    while (true) {
        const input = prompt(message);
        if (input === null) {
            return null;
        }
        const text = input.trim();
        const number = Number(text);
        if (text === "") {
            console.log("Lỗi: chưa nhập, nhập lại");
        } else if (!Number.isInteger(number)) {
            console.log("Lỗi: không phải số nguyên, nhập lại");
        } else if (number < min || number > max) {
            console.log(`Lỗi: ngoài phạm vi ${min} – ${max}, nhập lại`);
        } else {
            return number;
        }
    }
}

function inputText(message) {
    while (true) {
        const input = prompt(message);
        if (input === null) {
            return null;
        }
        const text = normalizeText(input);
        if (text !== "") {
            return text;
        }
        console.log("Lỗi: không được để trống, nhập lại");
    }
}

function inputExistingIndex(message) {
    const input = prompt(message);
    if (input === null) {
        console.log("Đã hủy thao tác");
        return -1;
    }
    const code = input.trim().toUpperCase();
    const index = findEmployeeIndex(code);
    if (index === -1) {
        console.log(`Không tìm thấy nhân viên có mã ${code}`);
    }
    return index;
}

function displayEmployees(list) {
    if (list.length === 0) {
        console.log("Danh sách nhân viên trống");
        return;
    }
    for (let i = 0; i < list.length; i++) {
        const employee = list[i];
        console.log(`${i + 1}. ${employee.employeeCode} - ${employee.fullName} - ${employee.department}`);
        console.log(`   Tuổi: ${employee.age} | Số năm kinh nghiệm: ${employee.experienceYears}`);
    }
    console.log(`Tổng: ${list.length} nhân viên`);
}

function showEmployees() {
    if (employees.length === 0) {
        console.log("Danh sách nhân viên trống");
        return;
    }
    const mode = inputIntegerInRange("1. Thứ tự hiện tại\n2. Sắp xếp theo số năm kinh nghiệm tăng dần", 1, 2);
    if (mode === 2) {
        const sortedList = [...employees].sort((a, b) => a.experienceYears - b.experienceYears);
        displayEmployees(sortedList);
    } else if (mode === 1) {
        displayEmployees(employees);
    }
}

function addEmployee() {
    const input = prompt("Nhập mã nhân viên:");
    if (input === null) {
        console.log("Đã hủy thao tác thêm");
        return;
    }
    const code = input.trim().toUpperCase();
    const error = validateEmployeeCode(code);
    if (error !== "") {
        console.log(error);
        return;
    }
    const fullName = inputText("Nhập họ tên:");
    if (fullName === null) {
        console.log("Đã hủy thao tác thêm");
        return;
    }
    const department = inputText("Nhập phòng ban:");
    if (department === null) {
        console.log("Đã hủy thao tác thêm");
        return;
    }
    const age = inputIntegerInRange("Nhập tuổi (18 - 60):", 18, 60);
    if (age === null) {
        console.log("Đã hủy thao tác thêm");
        return;
    }
    const experienceYears = inputIntegerInRange("Nhập số năm kinh nghiệm (0 - 40):", 0, 40);
    if (experienceYears === null) {
        console.log("Đã hủy thao tác thêm");
        return;
    }
    const newEmployee = { employeeCode: code, fullName, department, age, experienceYears };
    employees.push(newEmployee);
    console.log("Thêm thành công:");
    displayEmployees([newEmployee]);
}

function updateEmployee() {
    const index = inputExistingIndex("Nhập mã nhân viên cần cập nhật:");
    if (index === -1) {
        return;
    }
    const employee = employees[index];
    const age = inputIntegerInRange("Nhập tuổi mới (18 - 60):", 18, 60);
    if (age === null) {
        console.log("Đã hủy cập nhật");
        return;
    }
    const experienceYears = inputIntegerInRange("Nhập số năm kinh nghiệm mới (0 - 40):", 0, 40);
    if (experienceYears === null) {
        console.log("Đã hủy cập nhật");
        return;
    }
    console.log(`Trước: ${employee.age} / ${employee.experienceYears}`);
    employee.age = age;
    employee.experienceYears = experienceYears;
    console.log(`Sau: ${employee.age} / ${employee.experienceYears}`);
    console.log("Cập nhật thành công");
}

function deleteEmployee() {
    const index = inputExistingIndex("Nhập mã nhân viên cần xóa:");
    if (index === -1) {
        return;
    }
    const confirmText = prompt("Bạn có chắc muốn xóa? (Y/N)");
    if (confirmText !== null && confirmText.trim().toUpperCase() === "Y") {
        employees.splice(index, 1);
        console.log(`Xóa thành công, còn ${employees.length} nhân viên`);
    } else {
        console.log(`Đã hủy thao tác xóa, còn ${employees.length} nhân viên`);
    }
}

function searchByDepartment() {
    const input = prompt("Nhập từ khóa phòng ban:");
    if (input === null || input.trim() === "") {
        console.log("Chưa nhập từ khóa tìm kiếm");
        return;
    }
    const keyword = input.trim().toLowerCase();
    const results = employees.filter((employee) => employee.department.toLowerCase().includes(keyword));
    if (results.length === 0) {
        console.log("Không tìm thấy nhân viên phù hợp");
    } else {
        displayEmployees(results);
    }
}

function printReport() {
    console.log("==================================================");
    console.log("BÁO CÁO TỔNG KẾT NHÂN VIÊN");
    console.log("==================================================");
    if (employees.length === 0) {
        console.log("Chưa có nhân viên nào");
    } else {
        let total = 0;
        let top = employees[0];
        for (let employee of employees) {
            total += employee.experienceYears;
            if (employee.experienceYears > top.experienceYears) {
                top = employee;
            }
        }
        console.log(`Tổng số nhân viên: ${employees.length}`);
        console.log(`Số năm kinh nghiệm trung bình: ${(total / employees.length).toFixed(1)}`);
        console.log(`Kinh nghiệm nhiều nhất: ${top.employeeCode} - ${top.fullName} - ${top.experienceYears}`);
    }
    console.log("==================================================");
}1

const menu = `=====================================================
HỆ THỐNG QUẢN LÝ NHÂN VIÊN CÔNG TY SKYTECH
=====================================================
1. Hiển thị danh sách nhân viên
2. Thêm nhân viên mới
3. Cập nhật thông tin nhân viên
4. Xóa nhân viên
5. Tìm kiếm nhân viên theo phòng ban
0. Thoát chương trình
=====================================================
Vui lòng nhập lựa chọn của bạn (0 - 5):`;

let isRunning = true;
while (isRunning) {
    const choice = prompt(menu);
    switch (choice === null ? "" : choice.trim()) {
        case "1":
            showEmployees();
            break;
        case "2":
            addEmployee();
            break;
        case "3":
            updateEmployee();
            break;
        case "4":
            deleteEmployee();
            break;
        case "5":
            searchByDepartment();
            break;
        case "0":
            printReport();
            console.log("Tạm biệt!");
            isRunning = false;
            break;
        default:
            console.log("Lựa chọn không hợp lệ, vui lòng chọn từ 0 đến 5");
            break;
    }
}
