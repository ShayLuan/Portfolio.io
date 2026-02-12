import BrowserHistoryShowcase from '../components/ForGeeks/BrowserHistoryShowcase';

export const dsList = [
  {
    id: 'doubly-linked-list',
    name: 'Doubly Linked List',
    description: 'Each node has prev and next pointers. Used for browser history (back/forward), undo/redo, and other sequences where you need to move both ways.',
    ShowcaseComponent: BrowserHistoryShowcase,
    python: `class Node:
    def __init__(self, data):
        self.data = data
        self.prev = None
        self.next = None

class BrowserHistory:
    """Doubly linked list: back = prev, forward = next, visit = add and truncate."""
    def __init__(self, home_page):
        self.current = Node(home_page)

    def visit(self, url):
        new_node = Node(url)
        new_node.prev = self.current
        self.current.next = new_node
        self.current = new_node

    def back(self):
        if self.current.prev:
            self.current = self.current.prev
            return self.current.data
        return None

    def forward(self):
        if self.current.next:
            self.current = self.current.next
            return self.current.data
        return None

# Usage
history = BrowserHistory("Home")
history.visit("About")
history.visit("GitHub")
print(history.back())   # About
print(history.forward())  # GitHub
`,
    cpp: `#include <iostream>
#include <string>

struct Node {
    std::string data;
    Node* prev = nullptr;
    Node* next = nullptr;
    Node(const std::string& url) : data(url) {}
};

class BrowserHistory {
    Node* current;
public:
    BrowserHistory(const std::string& homePage) {
        current = new Node(homePage);
    }

    void visit(const std::string& url) {
        Node* new_node = new Node(url);
        new_node->prev = current;
        current->next = new_node;
        current = new_node;
    }

    std::string back() {
        if (current->prev) {
            current = current->prev;
            return current->data;
        }
        return "";
    }

    std::string forward() {
        if (current->next) {
            current = current->next;
            return current->data;
        }
        return "";
    }
};

int main() {
    BrowserHistory history("Home");
    history.visit("About");
    history.visit("GitHub");
    std::cout << history.back() << std::endl;     // About
    std::cout << history.forward() << std::endl;   // GitHub
    return 0;
}`
  }
];
