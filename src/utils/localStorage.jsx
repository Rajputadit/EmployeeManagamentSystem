const employees = [
  {
    id: 1,
    firstName: "Aditya",
    username: "aditya",
    email: "ad@a.com",
    password: "123",
    taskCounts: {
      active: 3,
      newTask: 2,
      completed: 5,
      failed: 1
    },
    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        taskTitle: "Connect API",
        taskDescription: "Integrate the frontend with the backend API.",
        taskDate: "2026-10-30",
        category: "Development"
      },
      {
        active: true,
        newTask: false,
        completed: false,
        failed: false,
        taskTitle: "Fetch Employee Data",
        taskDescription: "Display employee data from the API.",
        taskDate: "2026-11-01",
        category: "API"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        taskTitle: "Setup Routes",
        taskDescription: "Configure application routes.",
        taskDate: "2026-10-23",
        category: "Development"
      },
      {
        active: false,
        newTask: false,
        completed: false,
        failed: true,
        taskTitle: "Handle API Errors",
        taskDescription: "Fix error handling for failed requests.",
        taskDate: "2026-10-26",
        category: "Bug Fix"
      },
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        taskTitle: "Add Loading State",
        taskDescription: "Show a loading indicator during API calls.",
        taskDate: "2026-11-02",
        category: "Development"
      }
    ]
  },
  {
    id: 2,
    firstName: "Aarav",
    username: "aarav",
    email: "aarav.sharma@example.com",
    password: "123",
    taskCounts: {
      active: 3,
      newTask: 2,
      completed: 1,
      failed: 1
    },
    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        taskTitle: "Create Login Page",
        taskDescription: "Design and develop a responsive login page.",
        taskDate: "2026-10-30",
        category: "Development"
      },
      {
        active: true,
        newTask: false,
        completed: false,
        failed: false,
        taskTitle: "Build Dashboard",
        taskDescription: "Create the main dashboard UI.",
        taskDate: "2026-10-31",
        category: "Development"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        taskTitle: "Design Navbar",
        taskDescription: "Create a responsive navigation bar.",
        taskDate: "2026-10-25",
        category: "Design"
      },
      {
        active: false,
        newTask: false,
        completed: false,
        failed: true,
        taskTitle: "Fix Login Bug",
        taskDescription: "Fix the validation issue in the login form.",
        taskDate: "2026-10-26",
        category: "Bug Fix"
      },
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        taskTitle: "Create Profile Page",
        taskDescription: "Build a user profile page with editable fields.",
        taskDate: "2026-11-02",
        category: "Development"
      }
    ]
  },
  {
    id: 3,
    firstName: "Vivaan",
    username: "vivaan",
    email: "vivaan.verma@example.com",
    password: "123",
    taskCounts: {
      active: 3,
      newTask: 2,
      completed: 1,
      failed: 1
    },
    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        taskTitle: "Design Landing Page",
        taskDescription: "Create an attractive landing page UI.",
        taskDate: "2026-10-30",
        category: "Design"
      },
      {
        active: true,
        newTask: false,
        completed: false,
        failed: false,
        taskTitle: "Create Footer",
        taskDescription: "Build a reusable website footer.",
        taskDate: "2026-11-01",
        category: "Development"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        taskTitle: "Choose Color Palette",
        taskDescription: "Finalize the colors for the application.",
        taskDate: "2026-10-24",
        category: "Design"
      },
      {
        active: false,
        newTask: false,
        completed: false,
        failed: true,
        taskTitle: "Mobile Layout",
        taskDescription: "Fix responsive layout issues on mobile.",
        taskDate: "2026-10-27",
        category: "Bug Fix"
      },
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        taskTitle: "Create Settings Page",
        taskDescription: "Design the application settings screen.",
        taskDate: "2026-11-03",
        category: "Development"
      }
    ]
  },
  {
    id: 4,
    firstName: "Ishita",
    username: "ishita",
    email: "ishita.patel@example.com",
    password: "123",
    taskCounts: {
      active: 3,
      newTask: 2,
      completed: 1,
      failed: 1
    },
    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        taskTitle: "Write Test Cases",
        taskDescription: "Write test cases for the login feature.",
        taskDate: "2026-10-30",
        category: "Testing"
      },
      {
        active: true,
        newTask: false,
        completed: false,
        failed: false,
        taskTitle: "Test Dashboard",
        taskDescription: "Verify dashboard functionality.",
        taskDate: "2026-11-01",
        category: "Testing"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        taskTitle: "Test Registration",
        taskDescription: "Verify registration form validation.",
        taskDate: "2026-10-24",
        category: "Testing"
      },
      {
        active: false,
        newTask: false,
        completed: false,
        failed: true,
        taskTitle: "Fix Test Failure",
        taskDescription: "Investigate and fix failing test cases.",
        taskDate: "2026-10-27",
        category: "Bug Fix"
      },
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        taskTitle: "Test Profile Page",
        taskDescription: "Check profile editing and saving features.",
        taskDate: "2026-11-03",
        category: "Testing"
      }
    ]
  },
  {
    id: 5,
    firstName: "Ananya",
    username: "ananya",
    email: "ananya.singh@example.com",
    password: "123",
    taskCounts: {
      active: 3,
      newTask: 2,
      completed: 1,
      failed: 1
    },
    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        taskTitle: "Create Task Cards",
        taskDescription: "Build reusable task cards with Tailwind CSS.",
        taskDate: "2026-10-30",
        category: "Development"
      },
      {
        active: true,
        newTask: false,
        completed: false,
        failed: false,
        taskTitle: "Build Task List",
        taskDescription: "Display tasks in a horizontally scrollable list.",
        taskDate: "2026-11-01",
        category: "Development"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        taskTitle: "Style Task Badge",
        taskDescription: "Add colors to task priority badges.",
        taskDate: "2026-10-24",
        category: "Design"
      },
      {
        active: false,
        newTask: false,
        completed: false,
        failed: true,
        taskTitle: "Fix Card Overflow",
        taskDescription: "Resolve task card overflow issues.",
        taskDate: "2026-10-27",
        category: "Bug Fix"
      },
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        taskTitle: "Add Task Filters",
        taskDescription: "Filter tasks by their status.",
        taskDate: "2026-11-02",
        category: "Development"
      }
    ]
  }
]


const admin = {
  id: 1,
  email: "admin@example.com",
  password: "123"
}

export { employees, admin }

export const setLocalStorage = () => {
    if (!localStorage.getItem('employees')) {
        localStorage.setItem('employees', JSON.stringify(employees))
    }
    if (!localStorage.getItem('admin')) {
        localStorage.setItem('admin', JSON.stringify(admin))
    }
}


export const getLocalStorage =() =>{
    const employees= JSON.parse(localStorage.getItem('employees'))
    const admin = JSON.parse(localStorage.getItem('admin'))
    
    // console.log(employees,admin);
    return {employees,admin}
}
