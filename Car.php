<?php

class Car {
    public $engine;
    public $color;
    public $wheel;
    public $seat;
    public $sunRoof;
    public $fuelType;


}

class CarBuilder {
    public $car;

    public function __construct() {
        $this->car = new Car();
    }

    public function setEngine($engine) {
        $this->car->engine = $engine;
        return $this;
    }

    public function setColor($color) {
        $this->car->color = $color;
        return $this;
    }

    public function setWheel($wheel) {
        $this->car->wheel = $wheel;
        return $this;
    }

    public function setSeat($seat) {
        $this->car->seat = $seat;
        return $this;
    }

    public function setSunRoof($sunRoof) {
        $this->car->sunRoof = $sunRoof;
        return $this;
    }

    public function setFuelType($fuelType) {
        $this->car->fuelType = $fuelType;
        return $this;
    }

    public function build() {
        return $this->car;
    }
}

class CheapCar {
    public static function create() {
        $builder = new CarBuilder();
        return $builder
            ->setEngine("4 cyl")
            ->setColor("White")
            ->setWheel("Plastic")
            ->setSeat("Simple")
            ->setSunRoof(false)
            ->setFuelType("Gasoline")
            ->build();
    }
}

class SportCar {
    public static function create() {
        $builder = new CarBuilder();
        return $builder
            ->setEngine("V8")
            ->setColor("Red")
            ->setWheel("Alloy")
            ->setSeat("Leather")
            ->setSunRoof(true)
            ->setFuelType("Gasoline")
            ->build();
    }
}

$cheapCar = CheapCar::create();
$sportCar = SportCar::create();
  