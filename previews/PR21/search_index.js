var documenterSearchIndex = {"docs":
[{"location":"api/#API","page":"API","title":"API","text":"","category":"section"},{"location":"api/#Interface","page":"API","title":"Interface","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"with_logabsdet_jacobian\nNoLogAbsDetJacobian","category":"page"},{"location":"api/#ChangesOfVariables.with_logabsdet_jacobian","page":"API","title":"ChangesOfVariables.with_logabsdet_jacobian","text":"with_logabsdet_jacobian(f, x)\n\nComputes both the transformed value of x under the transformation f and the logarithm of the volume element.\n\nFor (y, ladj) = with_logabsdet_jacobian(f, x), the following must hold true:\n\ny == f(x)\nladj is the log(abs(det(jacobian(f, x))))\n\nwith_logabsdet_jacobian comes with support for broadcasted/mapped functions (via Base.Fix1) and (Julia >=v1.6 only) ComposedFunction.\n\nIf no volume element is defined/applicable, with_logabsdet_jacobian(f::F, x::T) returns NoLogAbsDetJacobian{F,T}().\n\nExamples\n\nusing ChangesOfVariables\n\nfoo(x) = inv(exp(-x) + 1)\n\nfunction ChangesOfVariables.with_logabsdet_jacobian(::typeof(foo), x)\n    y = foo(x)\n    ladj = -x + 2 * log(y)\n    (y, ladj)\nend\n\nx = 4.2\ny, ladj_y = with_logabsdet_jacobian(foo, x)\n\nusing LinearAlgebra, ForwardDiff\ny == foo(x) && ladj_y ≈ log(abs(ForwardDiff.derivative(foo, x)))\n\n# output\n\ntrue\n\nX = rand(10)\nbroadcasted_foo = Base.Fix1(broadcast, foo)\nY, ladj_Y = with_logabsdet_jacobian(broadcasted_foo, X)\nY == broadcasted_foo(X) && ladj_Y ≈ logabsdet(ForwardDiff.jacobian(broadcasted_foo, X))[1]\n\n# output\n\ntrue\n\nVERSION < v\"1.6\" || begin # Support for ∘ requires Julia >= v1.6\n    z, ladj_z = with_logabsdet_jacobian(log ∘ foo, x)\n    z == log(foo(x)) && ladj_z == ladj_y + with_logabsdet_jacobian(log, y)[2]\nend\n\n# output\n\ntrue\n\nImplementations of withlogabsdetjacobian can be tested (as a Test.@testset) using ChangesOfVariables.test_with_logabsdet_jacobian.\n\n\n\n\n\n","category":"function"},{"location":"api/#ChangesOfVariables.NoLogAbsDetJacobian","page":"API","title":"ChangesOfVariables.NoLogAbsDetJacobian","text":"struct NoLogAbsDetJacobian{F,T}\n\nAn instance NoLogAbsDetJacobian{F,T}() signifies that with_logabsdet_jacobian(::F, ::T) is not defined.\n\n\n\n\n\n","category":"type"},{"location":"api/#Test-utility","page":"API","title":"Test utility","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"ChangesOfVariables.test_with_logabsdet_jacobian","category":"page"},{"location":"api/#ChangesOfVariables.test_with_logabsdet_jacobian","page":"API","title":"ChangesOfVariables.test_with_logabsdet_jacobian","text":"ChangesOfVariables.test_with_logabsdet_jacobian(f, x, getjacobian; compare = isapprox, kwargs...)\n\nTest if with_logabsdet_jacobian(f, x) is implemented correctly.\n\nChecks if the result of with_logabsdet_jacobian(f, x) is approximately equal to (f(x), logabsdet(getjacobian(f, x)))\n\nSo the test uses getjacobian(f, x) to calculate a reference Jacobian for f at x. Passing ForwardDiff.jabobian, Zygote.jacobian or similar as the getjacobian function will do fine in most cases. If input and output of f are real scalar values, use ForwardDiff.derivative.\n\nNote that the result of getjacobian(f, x) must be a real-valued matrix or a real scalar, so you may need to use a custom getjacobian function that transforms the shape of x and f(x) internally, in conjunction with automatic differentiation.\n\nkwargs... are forwarded to compare.\n\n\n\n\n\n","category":"function"},{"location":"LICENSE/#LICENSE","page":"LICENSE","title":"LICENSE","text":"","category":"section"},{"location":"LICENSE/","page":"LICENSE","title":"LICENSE","text":"using Markdown\nMarkdown.parse_file(joinpath(@__DIR__, \"..\", \"..\", \"LICENSE.md\"))","category":"page"},{"location":"#ChangesOfVariables.jl","page":"Home","title":"ChangesOfVariables.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"ChangesOfVariables","category":"page"},{"location":"#ChangesOfVariables","page":"Home","title":"ChangesOfVariables","text":"ChangesOfVariables\n\nLightweight package that defines functionality to calculate volume element changes for functions that perform a change of variables (like coordinate transformations).\n\n\n\n\n\n","category":"module"},{"location":"","page":"Home","title":"Home","text":"This package defines the function with_logabsdet_jacobian. (y, ladj) = with_logabsdet_jacobian(f, x) computes both the transformed value of x under the transformation f and the logarithm of the volume element.","category":"page"},{"location":"","page":"Home","title":"Home","text":"with_logabsdet_jacobian supports mapped/broadcasted functions (via Base.Fix1) and (on Julia >=v1.6) function composition.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Implementations of with_logabsdet_jacobian(f) for identity, inv, adjoint and transpose as well as for exp, log, exp2, log2, exp10, log10, expm1 and log1p are included.","category":"page"}]
}
