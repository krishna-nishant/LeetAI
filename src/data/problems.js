export const problems = [
    {
        id: 1,
        title: "Two Sum",
        difficulty: "Easy",
        acceptance: "49.1%",
        description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.",
        examples: [
            {
                input: "nums = [2,7,11,15], target = 9",
                output: "[0,1]",
                explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
            },
            {
                input: "nums = [3,2,4], target = 6",
                output: "[1,2]",
            },
            {
                input: "nums = [3,3], target = 6",
                output: "[0,1]",
            }
        ],
        constraints: [
            "2 <= nums.length <= 10^4",
            "-10^9 <= nums[i] <= 10^9",
            "-10^9 <= target <= 10^9",
            "Only one valid answer exists."
        ],
        cppCode: `vector<int> twoSum(vector<int>& nums, int target) {
    // Your code here
}`,
    },
    {
        id: 2,
        title: "Add Two Numbers",
        difficulty: "Medium",
        acceptance: "39.9%",
        description: "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list. You may assume the two numbers do not contain any leading zero, except the number 0 itself.",
        examples: [
            {
                input: "l1 = [2,4,3], l2 = [5,6,4]",
                output: "[7,0,8]",
                explanation: "342 + 465 = 807."
            },
            {
                input: "l1 = [0], l2 = [0]",
                output: "[0]",
            },
            {
                input: "l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]",
                output: "[8,9,9,9,0,0,0,1]",
            }
        ],
        constraints: [
            "The number of nodes in each linked list is in the range [1, 100].",
            "0 <= Node.val <= 9",
            "It is guaranteed that the list represents a number that does not have leading zeros."
        ],
        cppCode: `/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
    // Your code here
}`,
    },
    {
        id: 3,
        title: "Longest Substring Without Repeating Characters",
        difficulty: "Medium",
        acceptance: "33.8%",
        description: "Given a string s, find the length of the longest substring without repeating characters.",
        examples: [
            {
                input: "s = \"abcabcbb\"",
                output: "3",
                explanation: "The answer is \"abc\", with the length of 3."
            },
            {
                input: "s = \"bbbbb\"",
                output: "1",
                explanation: "The answer is \"b\", with the length of 1."
            },
            {
                input: "s = \"pwwkew\"",
                output: "3",
                explanation: "The answer is \"wke\", with the length of 3. Notice that the answer must be a substring, \"pwke\" is a subsequence and not a substring."
            }
        ],
        constraints: [
            "0 <= s.length <= 5 * 10^4",
            "s consists of English letters, digits, symbols and spaces."
        ],
        cppCode: `int lengthOfLongestSubstring(string s) {
    // Your code here
}`,
    },
    {
        id: 4,
        title: "Median of Two Sorted Arrays",
        difficulty: "Hard",
        acceptance: "35.8%",
        description: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).",
        examples: [
            {
                input: "nums1 = [1,3], nums2 = [2]",
                output: "2.00000",
                explanation: "merged array = [1,2,3] and median is 2."
            },
            {
                input: "nums1 = [1,2], nums2 = [3,4]",
                output: "2.50000",
                explanation: "merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5."
            }
        ],
        constraints: [
            "nums1.length == m",
            "nums2.length == n",
            "0 <= m <= 1000",
            "0 <= n <= 1000",
            "1 <= m + n <= 2000",
            "-10^6 <= nums1[i], nums2[i] <= 10^6"
        ],
        cppCode: `double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
    // Your code here
}`,
    },
    {
        id: 5,
        title: "Longest Palindromic Substring",
        difficulty: "Medium",
        acceptance: "32.4%",
        description: "Given a string s, return the longest palindromic substring in s.",
        examples: [
            {
                input: "s = \"babad\"",
                output: "\"bab\"",
                explanation: "\"aba\" is also a valid answer."
            },
            {
                input: "s = \"cbbd\"",
                output: "\"bb\"",
            }
        ],
        constraints: [
            "1 <= s.length <= 1000",
            "s consist of only digits and English letters."
        ],
        cppCode: `string longestPalindrome(string s) {
    // Your code here
}`,
    },
    {
        id: 6,
        title: "Zigzag Conversion",
        difficulty: "Medium",
        acceptance: "42.5%",
        description: "The string \"PAYPALISHIRING\" is written in a zigzag pattern on a given number of rows like this: P   A   H   N, A P L S I I G, Y   I   R. And then read line by line: \"PAHNAPLSIIGYIR\". Write the code that will take a string and make this conversion given a number of rows.",
        examples: [
            {
                input: "s = \"PAYPALISHIRING\", numRows = 3",
                output: "\"PAHNAPLSIIGYIR\"",
            },
            {
                input: "s = \"PAYPALISHIRING\", numRows = 4",
                output: "\"PINALSIGYAHRPI\"",
                explanation: "P     I    N\nA   L S  I G\nY A   H R\nP     I"
            },
            {
                input: "s = \"A\", numRows = 1",
                output: "\"A\"",
            }
        ],
        constraints: [
            "1 <= s.length <= 1000",
            "s consists of English letters (lower-case and upper-case), ',' and '.'.",
            "1 <= numRows <= 1000"
        ],
        cppCode: `string convert(string s, int numRows) {
    // Your code here
}`,
    }
]; 